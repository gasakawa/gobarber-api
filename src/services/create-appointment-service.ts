import { startOfHour } from 'date-fns';
import Appointment from '../models/appointment-model';
import AppointmentRepository from '../repository/appointment-repository';

interface Request {
  date: Date;
  provider: string;
}
class CreateAppointmentService {
  private readonly appointmentRepository: AppointmentRepository;

  constructor(appointmentRepository: AppointmentRepository) {
    this.appointmentRepository = appointmentRepository;
  }

  public execute({ date, provider }: Request): Appointment {
    const appointmentDate = startOfHour(date);

    if (this.appointmentRepository.findByDate(appointmentDate)) {
      throw Error('This appointment is already booked');
    }

    const appointment = this.appointmentRepository.create({
      provider,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
