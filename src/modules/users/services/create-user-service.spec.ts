import AppError from '@shared/errors/app-error';
import FakeCacheProvider from '@shared/container/providers/cache-provider/fakes/fake-cache-provider';
import FakeUsersRepository from '../repositories/fakes/fake-users-repository';
import CreateUserService from './create-user-service';
import FakeHashProvider from '../providers/hash-provider/fakes/fake-hash-provider';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;
let fakeCacheProvider: FakeCacheProvider;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeCacheProvider = new FakeCacheProvider();
    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider, fakeCacheProvider);
  });
  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'fake_user',
      email: 'fake_email@email.com',
      password: 'fake_password',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with same email', async () => {
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
