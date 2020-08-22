import 'reflect-metadata';
import ListProviderMonthAvailabilityService from './list-provider-month-availability-service';
import FakeAppointmentRepository from '../repositories/fakes/fake-appointments-repository';

let listProviderMonthAvailability: ListProviderMonthAvailabilityService;
let fakeAppointmentsRepository: FakeAppointmentRepository;

describe('ListProviderMonthAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentRepository();
    listProviderMonthAvailability = new ListProviderMonthAvailabilityService(fakeAppointmentsRepository);
  });

  it('should be able to list the provider month availability', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: 'provider_id',
      date: new Date(2020, 7, 21, 8, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'provider_id',
      date: new Date(2020, 7, 21, 10, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'provider_id',
      date: new Date(2020, 7, 22, 8, 0, 0),
    });

    const available = await listProviderMonthAvailability.execute({
      provider_id: 'user_id',
      year: 2020,
      month: 8,
    });

    expect(available).toEqual(
      expect.arrayContaining([
        { day: 20, available: true },
        { day: 21, available: true },
        { day: 22, available: true },
      ]),
    );
  });
});
