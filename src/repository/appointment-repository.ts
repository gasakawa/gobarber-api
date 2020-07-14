import { EntityRepository, Repository } from 'typeorm';
import Appointment from '../modules/appointments/entities/appointment';

@EntityRepository(Appointment)
class AppointmentRepository extends Repository<Appointment> {
  public async findByDate(date: Date): Promise<Appointment | null> {
    const appointmentFound = await this.findOne({
      where: {
        date,
      },
    });
    return appointmentFound || null;
  }
}

export default AppointmentRepository;
