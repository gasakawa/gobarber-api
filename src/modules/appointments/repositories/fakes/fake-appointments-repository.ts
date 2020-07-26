import { uuid } from 'uuidv4';
import Appointment from '@modules/appointments/infra/typeorm/entities/appointment';
import { IAppointmentsRepository } from '@modules/appointments/repositories/iappointments-repository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/icreate-appointment-dto';
import { isEqual } from 'date-fns';

export default class FakeAppointmentRepository implements IAppointmentsRepository {
  private appointments: Appointment[] = [];

  public async create({ date, provider_id }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, { id: uuid(), date, provider_id });
    this.appointments.push(appointment);

    return appointment;
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const appointmentFound = this.appointments.find(appointment => isEqual(appointment.date, date));
    return appointmentFound;
  }
}
