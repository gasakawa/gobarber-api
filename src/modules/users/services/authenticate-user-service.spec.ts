import AppError from '@shared/errors/app-error';
import FakeUsersRepository from '../repositories/fakes/fake-users-repository';

import AuthenticateUserService from './authenticate-user-service';
import CreateUserService from './create-user-service';
import FakeHashProvider from '../providers/hash-provider/fakes/fake-hash-provider';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;
let authenticateUser: AuthenticateUserService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
    authenticateUser = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider);
  });

  it('should be able to authenticate', async () => {
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
    await expect(
      authenticateUser.execute({
        email: 'fake_email@email.com',
        password: 'fake_password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should no be able authenticate with wrong password', async () => {
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
