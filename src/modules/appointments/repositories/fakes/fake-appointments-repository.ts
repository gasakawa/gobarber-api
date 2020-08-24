import { uuid } from 'uuidv4';
import Appointment from '@modules/appointments/infra/typeorm/entities/appointment';
import { IAppointmentsRepository } from '@modules/appointments/repositories/iappointments-repository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/icreate-appointment-dto';
import { isEqual, getMonth, getYear, getDate } from 'date-fns';
import IFindAllInMonthFromProviderDTO from '@modules/appointments/dtos/ifind-all-in-month-from-provider-dto';
import IFindAllInDayFromProviderDTO from '@modules/appointments/dtos/ifind-all-in-day-from-provider-dto';

export default class FakeAppointmentRepository implements IAppointmentsRepository {
  private appointments: Appointment[] = [];

  public async create({ date, provider_id, user_id }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, { id: uuid(), date, provider_id, user_id });
    this.appointments.push(appointment);

    return appointment;
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const appointmentFound = this.appointments.find(appointment => isEqual(appointment.date, date));
    return appointmentFound;
  }

  public async findAllInMonthFromProvider({
    provider_id,
    month,
    year,
  }: IFindAllInMonthFromProviderDTO): Promise<Appointment[]> {
    const appointments = this.appointments.filter(
      appointment =>
        appointment.provider_id === provider_id &&
        getMonth(appointment.date) === month - 1 &&
        getYear(appointment.date) === year,
    );
    return appointments;
  }

  public async findAllInDayFromProvider({
    provider_id,
    month,
    year,
    day,
  }: IFindAllInDayFromProviderDTO): Promise<Appointment[]> {
    const appointments = this.appointments.filter(
      appointment =>
        appointment.provider_id === provider_id &&
        getMonth(appointment.date) === month - 1 &&
        getYear(appointment.date) === year &&
        getDate(appointment.date) === day,
    );
    return appointments;
  }
}
