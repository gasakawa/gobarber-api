import AppError from '@shared/errors/app-error';
import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/fake-notification-repository';
import FakeAppointmentRepository from '../repositories/fakes/fake-appointments-repository';
import CreateAppointmentService from './create-appointment-service';

let fakeAppointmentsRepository: FakeAppointmentRepository;
let fakeNotificationsRepository: FakeNotificationsRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentRepository();
    fakeNotificationsRepository = new FakeNotificationsRepository();
    createAppointment = new CreateAppointmentService(fakeAppointmentsRepository, fakeNotificationsRepository);
  });

  it('should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 7, 10, 12).getTime();
    });
    const appointment = await createAppointment.execute({
      date: new Date(2020, 7, 10, 13),
      provider_id: '123456789',
      user_id: '65644646',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123456789');
  });

  it('should not be able to create two appointments on the same time', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 7, 10, 12).getTime();
    });
    const appointmentDate = new Date(2020, 7, 10, 14);

    await createAppointment.execute({
      date: appointmentDate,
      provider_id: '123456789',
      user_id: '65644646',
    });

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: '123456789',
        user_id: '65644646',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment on a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 7, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 7, 10, 11),
        provider_id: '123456789',
        user_id: '65644646',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment with same user as provider', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 7, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 7, 10, 14),
        provider_id: '123456789',
        user_id: '123456789',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment before 8 am', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 7, 10, 7).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 7, 11, 7),
        provider_id: '123456789',
        user_id: '123456789',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment after 5 pm', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 7, 10, 7).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 7, 11, 19),
        provider_id: '123456789',
        user_id: '123456789',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
