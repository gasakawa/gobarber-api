import AppError from '@shared/errors/app-error';
import FakeUsersRepository from '../repositories/fakes/fake-users-repository';
import ShowProfileService from './show-profile-service';

let fakeUsersRepository: FakeUsersRepository;
let showProfile: ShowProfileService;

describe('ShowProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    showProfile = new ShowProfileService(fakeUsersRepository);
  });

  it('should be able get user profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Fake User',
      email: 'fake_user@email.com',
      password: 'fake_password',
    });

    const userProfile = await showProfile.execute(user.id);

    expect(userProfile.name).toBe('Fake User');
  });

  it('should be throws if user not exists', async () => {
    await expect(showProfile.execute('not_exists_user_id')).rejects.toBeInstanceOf(AppError);
  });
});
