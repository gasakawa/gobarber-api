import Appointment from '@modules/appointments/infra/typeorm/entities/appointment';

export interface IAppointmentsRepository {
  findByDate: (date: Date) => Promise<Appointment | undefined>;
}
