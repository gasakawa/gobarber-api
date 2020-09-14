import { inject, injectable } from 'tsyringe';
import ICacheProvider from '@shared/container/providers/cache-provider/models/icache-provider';
import { IAppointmentsRepository } from '../repositories/iappointments-repository';
import Appointment from '../infra/typeorm/entities/appointment';

interface IRequest {
  provider_id: string;
  month: number;
  year: number;
  day: number;
}

@injectable()
export default class ListProviderAppointmentsService {
  constructor(
    @inject('AppoinmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ provider_id, month, year, day }: IRequest): Promise<Appointment[]> {
    const cacheKey = `provider-appointments:${provider_id}:${year}-${month}-${day}`;

    let appointments = await this.cacheProvider.recover<Appointment[]>(cacheKey);

    if (!appointments) {
      appointments = await this.appointmentsRepository.findAllInDayFromProvider({
        provider_id,
        month,
        year,
        day,
      });

      await this.cacheProvider.save(cacheKey, appointments);
    }
    return appointments;
  }
}
