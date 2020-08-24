import { startOfHour } from 'date-fns';
import { inject, injectable } from 'tsyringe';

import Appointment from '@modules/appointments/infra/typeorm/entities/appointment';
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

    const findAppointmentInsSameData = await this.appointmentsRepository.findByDate(appointmentDate);

    if (findAppointmentInsSameData) {
      throw Error('This appointment is already booked');
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
