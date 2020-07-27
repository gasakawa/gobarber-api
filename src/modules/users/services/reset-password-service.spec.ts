import FakeUsersRepository from '../repositories/fakes/fake-users-repository';
import FakeUserTokensRepository from '../repositories/fakes/fake-user-tokens-repository';
import ResetPasswordService from './reset-password-service';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let resetPassword: ResetPasswordService;

describe('ResetPassword', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserTokensRepository = new FakeUserTokensRepository();

    resetPassword = new ResetPasswordService(fakeUsersRepository, fakeUserTokensRepository);
  });

  it('should be able to reset the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Fake User',
      email: 'fake_mail@email.com',
      password: 'fake_password',
    });

    const { token } = await fakeUserTokensRepository.generate(user.id);

    await resetPassword.execute({
      password: 'new_password',
      token,
    });

    const updatedUser = await fakeUsersRepository.findById(user.id);

    expect(updatedUser?.password).toBe('new_password');
  });
});
