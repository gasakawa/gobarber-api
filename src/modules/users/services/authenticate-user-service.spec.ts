import AppError from '@shared/errors/app-error';
import FakeUsersRepository from '../repositories/fakes/fake-users-repository';

import AuthenticateUserService from './authenticate-user-service';
import CreateUserService from './create-user-service';
import FakeHashProvider from '../providers/hash-provider/fakes/fake-hash-provider';

describe('AuthenticateUser', () => {
  it('should be able to authenticate', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
    const authenticateUser = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider);

    const user = await createUser.execute({
      name: 'fake_user',
      email: 'fake_email@email.com',
      password: 'fake_password',
    });

    const response = await authenticateUser.execute({
      email: 'fake_email@email.com',
      password: 'fake_password',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should no be able authenticate with no existing user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const authenticateUser = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider);

    await expect(
      authenticateUser.execute({
        email: 'fake_email@email.com',
        password: 'fake_password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should no be able authenticate with wrong password', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
    const authenticateUser = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider);

    await createUser.execute({
      name: 'fake_user',
      email: 'fake_email@email.com',
      password: 'fake_password',
    });

    await expect(
      authenticateUser.execute({
        email: 'fake_email@email.com',
        password: 'wrong_password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
