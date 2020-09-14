import 'reflect-metadata';
import FakeCacheProvider from '@shared/container/providers/cache-provider/fakes/fake-cache-provider';
import FakeAppointmentRepository from '../repositories/fakes/fake-appointments-repository';
import ListProviderAppointmentsService from './list-provider-appointments-service';

let listProviderAppointments: ListProviderAppointmentsService;
let fakeAppointmentsRepository: FakeAppointmentRepository;
let fakeCacheProvider: FakeCacheProvider;

describe('ListProviderAppointmentsService', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentRepository();
    fakeCacheProvider = new FakeCacheProvider();
    listProviderAppointments = new ListProviderAppointmentsService(fakeAppointmentsRepository, fakeCacheProvider);
  });

  it('should be able to list the provider appointments on a specific day', async () => {
    const appointment1 = await fakeAppointmentsRepository.create({
      provider_id: 'provider_id',
      user_id: 'user_id',
      date: new Date(2020, 7, 21, 8, 0, 0),
    });

    const appointment2 = await fakeAppointmentsRepository.create({
      provider_id: 'provider_id',
      user_id: 'user_id',
      date: new Date(2020, 7, 21, 10, 0, 0),
    });

    const appointments = await listProviderAppointments.execute({
      provider_id: 'provider_id',
      year: 2020,
      month: 8,
      day: 21,
    });

    expect(appointments).toEqual(expect.arrayContaining([appointment1, appointment2]));
  });
});
