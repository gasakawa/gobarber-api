import AppError from '@shared/errors/app-error';
import FakeHashProvider from '../providers/hash-provider/fakes/fake-hash-provider';
import FakeUsersRepository from '../repositories/fakes/fake-users-repository';
import UpdateUserProfileService from './update-user-profile-service';

let fakeHashProvider: FakeHashProvider;
let fakeUsersRepository: FakeUsersRepository;
let updateProfile: UpdateUserProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeHashProvider = new FakeHashProvider();
    fakeUsersRepository = new FakeUsersRepository();

    updateProfile = new UpdateUserProfileService(fakeUsersRepository, fakeHashProvider);
  });

  it('should be able user update profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Fake User',
      email: 'fake_user@email.com',
      password: 'fake_password',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Fake User Name',
      email: 'fake_user@email.com',
    });

    expect(updatedUser.name).toBe('Fake User Name');
  });

  it('should not be able user change to another user email', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Fake User',
      email: 'fake_user@email.com',
      password: 'fake_password',
    });

    await fakeUsersRepository.create({
      name: 'Fake User Fake',
      email: 'fake_user_email@email.com',
      password: 'fake_password',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Fake User Name',
        email: 'fake_user_email@email.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able user change his own password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Fake User',
      email: 'fake_user@email.com',
      password: 'fake_password',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Fake User',
      email: 'fake_user@email.com',
      password: 'new_password',
      old_password: 'fake_password',
    });

    expect(updatedUser.password).toBe('new_password');
  });

  it('should not be able user change his own password if not inform the old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Fake User',
      email: 'fake_user@email.com',
      password: 'fake_password',
    });

    expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Fake User',
        email: 'fake_user@email.com',
        password: 'new_password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able user change his own password if not inform the correct old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Fake User',
      email: 'fake_user@email.com',
      password: 'fake_password',
    });

    expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Fake User',
        email: 'fake_user@email.com',
        password: 'new_password',
        old_password: 'old_password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able user changes password if the user not exists', async () => {
    await fakeUsersRepository.create({
      name: 'Fake User',
      email: 'fake_user@email.com',
      password: 'fake_password',
    });

    expect(
      updateProfile.execute({
        user_id: 'not_exists_id',
        name: 'Fake User',
        email: 'fake_user@email.com',
        password: 'new_password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
