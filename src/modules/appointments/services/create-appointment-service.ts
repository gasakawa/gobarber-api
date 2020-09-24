import { startOfHour, isBefore, getHours, format } from 'date-fns';
import { inject, injectable } from 'tsyringe';

import Appointment from '@modules/appointments/infra/typeorm/entities/appointment';
import AppError from '@shared/errors/app-error';
import INotificationsRepository from '@modules/notifications/repositories/inotifications-repository';
import ICacheProvider from '@shared/container/providers/cache-provider/models/icache-provider';
import { IAppointmentsRepository } from '../repositories/iappointments-repository';

interface IRequest {
  date: Date;
  provider_id: string;
  user_id: string;
}
@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppoinmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ date, provider_id, user_id }: IRequest): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    if (isBefore(appointmentDate, Date.now())) {
      throw new AppError('Is not possible create an appointment at past date');
    }

    if (user_id === provider_id) {
      throw new AppError('Is not possible create an appointment to yourself');
    }

    if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17) {
      throw new AppError('Only is avoid create appointment between 8 and 17');
    }

    const findAppointmentInsSameData = await this.appointmentsRepository.findByDate(appointmentDate, provider_id);

    if (findAppointmentInsSameData) {
      throw new AppError('This appointment is already booked');
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
      user_id,
    });

    const formattedDate = format(appointmentDate, "dd/MM/yyyy 'às' HH:mm");

    await this.notificationsRepository.create({
      recipient_id: provider_id,
      content: `Novo agendamento para dia ${formattedDate}`,
    });

    await this.cacheProvider.invalidate(`provider-appointments:${provider_id}:${format(appointmentDate, 'yyyy-M-d')}`);

    return appointment;
  }
}

export default CreateAppointmentService;
