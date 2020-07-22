import { getRepository, Repository } from 'typeorm';
import Appointment from '@modules/appointments/infra/typeorm/entities/appointment';
import { IAppointmentsRepository } from '@modules/appointments/repositories/iappointments-repository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/icreate-appointment-dto';

class AppointmentRepository implements IAppointmentsRepository {
  private readonly ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  public async create({ date, provider_id }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create({ date, provider_id });
    await this.ormRepository.save(appointment);

    return appointment;
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const appointmentFound = await this.ormRepository.findOne({
      where: {
        date,
      },
    });
    return appointmentFound;
  }
}

export default AppointmentRepository;
