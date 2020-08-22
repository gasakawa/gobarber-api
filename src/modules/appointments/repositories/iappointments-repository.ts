import Appointment from '@modules/appointments/infra/typeorm/entities/appointment';
import ICreateAppointmentDTO from '../dtos/icreate-appointment-dto';
import IFindAllInMonthFromProviderDTO from '../dtos/ifind-all-in-month-from-provider-dto';
import IFindAllInDayFromProviderDTO from '../dtos/ifind-all-in-day-from-provider-dto';

export interface IAppointmentsRepository {
  findByDate: (date: Date) => Promise<Appointment | undefined>;
  create: (data: ICreateAppointmentDTO) => Promise<Appointment>;
  findAllInMonthFromProvider: (data: IFindAllInMonthFromProviderDTO) => Promise<Appointment[]>;
  findAllInDayFromProvider: (data: IFindAllInDayFromProviderDTO) => Promise<Appointment[]>;
}
