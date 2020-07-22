import { EntityRepository, Repository } from 'typeorm';
import Appointment from '@modules/appointments/infra/typeorm/entities/appointment';
import { IAppointmentsRepository } from '@modules/appointments/repositories/iappointments-repository';

@EntityRepository(Appointment)
class AppointmentRepository extends Repository<Appointment> implements IAppointmentsRepository {
  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const appointmentFound = await this.findOne({
      where: {
        date,
      },
    });
    return appointmentFound;
  }
}

export default AppointmentRepository;
