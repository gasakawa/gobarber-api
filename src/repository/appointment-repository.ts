import { isEqual } from 'date-fns';
import Appointment from '../models/appointment-model';

interface CreateAppointmentDTO {
  provider: string;
  date: Date;
}

class AppointmentRepository {
  private appointments: Appointment[];

  constructor() {
    this.appointments = [];
  }

  public create({ provider, date }: CreateAppointmentDTO): Appointment {
    const appointment = new Appointment({ provider, date });
    this.appointments.push(appointment);
    return appointment;
  }

  public findByDate(date: Date): Appointment | null {
    const appointmentFound = this.appointments.find(appointment => isEqual(date, appointment.date));
    return appointmentFound || null;
  }

  public all(): Appointment[] {
    return this.appointments;
  }
}

export default AppointmentRepository;
