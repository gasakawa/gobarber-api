import { getRepository, Repository, Raw } from 'typeorm';
import Appointment from '@modules/appointments/infra/typeorm/entities/appointment';
import { IAppointmentsRepository } from '@modules/appointments/repositories/iappointments-repository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/icreate-appointment-dto';
import IFindAllInMonthFromProviderDTO from '@modules/appointments/dtos/ifind-all-in-month-from-provider-dto';
import IFindAllInDayFromProviderDTO from '@modules/appointments/dtos/ifind-all-in-day-from-provider-dto';

class AppointmentRepository implements IAppointmentsRepository {
  private readonly ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  public async create({ date, provider_id, user_id }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create({ date, provider_id, user_id });
    await this.ormRepository.save(appointment);

    return appointment;
  }

  public async findByDate(date: Date, provider_id: string): Promise<Appointment | undefined> {
    const appointmentFound = await this.ormRepository.findOne({
      where: {
        date,
        provider_id,
      },
    });
    return appointmentFound;
  }

  public async findAllInMonthFromProvider({
    provider_id,
    month,
    year,
  }: IFindAllInMonthFromProviderDTO): Promise<Appointment[]> {
    const parsedMonth = String(month).padStart(2, '0');
    const appointments = await this.ormRepository.find({
      where: {
        provider_id,
        date: Raw(dateFieldName => `to_char(${dateFieldName}, 'MM-YYYY') = '${parsedMonth}-${year}'`),
      },
    });
    return appointments;
  }

  public async findAllInDayFromProvider({
    provider_id,
    month,
    year,
    day,
  }: IFindAllInDayFromProviderDTO): Promise<Appointment[]> {
    const parsedMonth = String(month).padStart(2, '0');
    const parsedDay = String(day).padStart(2, '0');

    const appointments = await this.ormRepository.find({
      where: {
        provider_id,
        date: Raw(dateFieldName => `to_char(${dateFieldName}, 'DD-MM-YYYY') = '${parsedDay}-${parsedMonth}-${year}'`),
      },
    });
    return appointments;
  }
}

export default AppointmentRepository;
