import FakeUsersRepository from '@modules/users/repositories/fakes/fake-users-repository';
import FakeCacheProvider from '@shared/container/providers/cache-provider/fakes/fake-cache-provider';
import ListProviderService from './list-provider-service';

let fakeUsersRepository: FakeUsersRepository;
let listProviders: ListProviderService;
let fakeCacheProvider: FakeCacheProvider;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeCacheProvider = new FakeCacheProvider();
    listProviders = new ListProviderService(fakeUsersRepository, fakeCacheProvider);
  });

  it('should be able to list the providers', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'Fake User 1',
      email: 'fake_user1@email.com',
      password: 'fake1_password',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'Fake User 2',
      email: 'fake_user2@email.com',
      password: 'fake2_password',
    });

    const loggedUser = await fakeUsersRepository.create({
      name: 'Fake Logged User',
      email: 'fake_logged_user@email.com',
      password: 'fake_logged_password',
    });

    const user3 = await fakeUsersRepository.create({
      name: 'Fake User 3',
      email: 'fake_user3@email.com',
      password: 'fake3_password',
    });

    const providers = await listProviders.execute(loggedUser.id);

    expect(providers).toEqual([user1, user2, user3]);
  });
});
