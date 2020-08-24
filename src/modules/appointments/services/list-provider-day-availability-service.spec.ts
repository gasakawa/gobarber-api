import 'reflect-metadata';
import FakeAppointmentRepository from '../repositories/fakes/fake-appointments-repository';
import ListProviderDayAvailabilityService from './list-provider-day-availability-service';

let listProviderDayAvailability: ListProviderDayAvailabilityService;
let fakeAppointmentsRepository: FakeAppointmentRepository;

describe('ListProviderDayAvailabilityService', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentRepository();
    listProviderDayAvailability = new ListProviderDayAvailabilityService(fakeAppointmentsRepository);
  });

  it('should be able to list the provider day availability', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: 'provider_id',
      user_id: 'user_id',
      date: new Date(2020, 7, 21, 14, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'provider_id',
      user_id: 'user_id',
      date: new Date(2020, 7, 21, 15, 0, 0),
    });

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 7, 21, 11).getTime();
    });

    const available = await listProviderDayAvailability.execute({
      provider_id: 'provider_id',
      year: 2020,
      month: 8,
      day: 21,
    });

    expect(available).toEqual(
      expect.arrayContaining([
        { hour: 8, available: false },
        { hour: 9, available: false },
        { hour: 10, available: false },
        { hour: 14, available: false },
        { hour: 15, available: false },
        { hour: 13, available: true },
        { hour: 16, available: true },
      ]),
    );
  });
});
