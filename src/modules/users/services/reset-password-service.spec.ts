import AppError from '@shared/errors/app-error';
import FakeUsersRepository from '../repositories/fakes/fake-users-repository';
import FakeUserTokensRepository from '../repositories/fakes/fake-user-tokens-repository';
import ResetPasswordService from './reset-password-service';
import FakeHashProvider from '../providers/hash-provider/fakes/fake-hash-provider';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let resetPassword: ResetPasswordService;
let fakeHashProvider: FakeHashProvider;

describe('ResetPassword', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserTokensRepository = new FakeUserTokensRepository();
    fakeHashProvider = new FakeHashProvider();
    resetPassword = new ResetPasswordService(fakeUsersRepository, fakeUserTokensRepository, fakeHashProvider);
  });

  it('should be able to reset the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Fake User',
      email: 'fake_mail@email.com',
      password: 'fake_password',
    });

    const { token } = await fakeUserTokensRepository.generate(user.id);

    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');

    await resetPassword.execute({
      password: 'new_password',
      token,
    });

    const updatedUser = await fakeUsersRepository.findById(user.id);

    expect(generateHash).toHaveBeenCalledWith('new_password');
    expect(updatedUser?.password).toBe('new_password');
  });

  it('should not be able to reset the password with not-existing token', async () => {
    await expect(
      resetPassword.execute({
        password: 'new_password',
        token: 'wrong_token',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset the password if token was generated more than 2 hours', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Fake User',
      email: 'fake_mail@email.com',
      password: 'fake_password',
    });

    const { token } = await fakeUserTokensRepository.generate(user.id);

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();

      return customDate.setHours(customDate.getHours() + 3);
    });

    await expect(
      resetPassword.execute({
        password: 'new_password',
        token,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
