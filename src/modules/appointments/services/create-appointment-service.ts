import { startOfHour, isBefore, getHours } from 'date-fns';
import { inject, injectable } from 'tsyringe';

import Appointment from '@modules/appointments/infra/typeorm/entities/appointment';
import AppError from '@shared/errors/app-error';
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

    const findAppointmentInsSameData = await this.appointmentsRepository.findByDate(appointmentDate);

    if (findAppointmentInsSameData) {
      throw new AppError('This appointment is already booked');
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
      user_id,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
