import Appointment from '@modules/appointments/infra/typeorm/entities/appointment';
import ICreateAppointmentDTO from '../dtos/icreate-appointment-dto';

export interface IAppointmentsRepository {
  findByDate: (date: Date) => Promise<Appointment | undefined>;
  create: (data: ICreateAppointmentDTO) => Promise<Appointment>;
}
