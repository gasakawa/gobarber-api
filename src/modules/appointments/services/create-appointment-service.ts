import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppointmentRepository from '../../../repository/appointment-repository';
import Appointment from '../entities/appointment';

interface Request {
  date: Date;
  provider_id: string;
}
class CreateAppointmentService {
  public async execute({ date, provider_id }: Request): Promise<Appointment> {
    const appointmentRepository = getCustomRepository(AppointmentRepository);

    const appointmentDate = startOfHour(date);

    const findAppointmentInsSameData = await appointmentRepository.findByDate(appointmentDate);

    if (findAppointmentInsSameData) {
      throw Error('This appointment is already booked');
    }

    const appointment = appointmentRepository.create({
      provider_id,
      date: appointmentDate,
    });

    await appointmentRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
