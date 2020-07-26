import AppError from '@shared/errors/app-error';
import FakeUsersRepository from '../repositories/fakes/fake-users-repository';
import CreateUserService from './create-user-service';
import FakeHashProvider from '../providers/hash-provider/fakes/fake-hash-provider';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createAppointment = new CreateUserService(fakeUsersRepository, fakeHashProvider);

    const user = await createAppointment.execute({
      name: 'fake_user',
      email: 'fake_email@email.com',
      password: 'fake_password',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with same email', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);

    await createUser.execute({
      name: 'fake_user',
      email: 'fake_email@email.com',
      password: 'fake_password',
    });

    await expect(
      createUser.execute({
        name: 'fake_user',
        email: 'fake_email@email.com',
        password: 'fake_password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
