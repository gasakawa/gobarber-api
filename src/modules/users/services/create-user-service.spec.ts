import FakeUsersRepository from '../repositories/fakes/fake-users-repository';
import CreateUserService from './create-user-service';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createAppointment = new CreateUserService(fakeUsersRepository);

    const user = await createAppointment.execute({
      name: 'fake_user',
      email: 'fake_email@email.com',
      password: 'fake_password',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with same email', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createAppointment = new CreateUserService(fakeUsersRepository);

    await createAppointment.execute({
      name: 'fake_user',
      email: 'fake_email@email.com',
      password: 'fake_password',
    });

    expect(
      createAppointment.execute({
        name: 'fake_user',
        email: 'fake_email@email.com',
        password: 'fake_password',
      }),
    ).rejects.toBeInstanceOf(Error);
  });
});
