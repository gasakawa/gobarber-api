import FakeMailProvider from '@shared/container/providers/mail-provider/fakes/fake-mail-provider';
import AppError from '@shared/errors/app-error';
import FakeUsersRepository from '../repositories/fakes/fake-users-repository';
import SendForgottenPasswordEmailService from './send-forgotten-password-email-service';
import FakeUserTokensRepository from '../repositories/fakes/fake-user-tokens-repository';

let fakeUsersRepository: FakeUsersRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUserTokensRepository: FakeUserTokensRepository;
let sendForgottenPasswordEmail: SendForgottenPasswordEmailService;

describe('SendForgottenPasswordEmail', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeUserTokensRepository = new FakeUserTokensRepository();

    sendForgottenPasswordEmail = new SendForgottenPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider,
      fakeUserTokensRepository,
    );
  });

  it('should be able to recover the user password using the email', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    await fakeUsersRepository.create({
      name: 'Fake User',
      email: 'fake_email@email.com',
      password: 'fake_password',
    });

    await sendForgottenPasswordEmail.execute({
      email: 'fake_email@email.com',
    });

    expect(sendMail).toHaveBeenCalledWith('fake_email@email.com', 'recover your password');
  });

  it('should not be able to recover a non-existing user password', async () => {
    await expect(
      sendForgottenPasswordEmail.execute({
        email: 'fake_email@email.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should generate a forgot password token', async () => {
    const generate = jest.spyOn(fakeUserTokensRepository, 'generate');
    const user = await fakeUsersRepository.create({
      name: 'Fake User',
      email: 'fake_email@email.com',
      password: 'fake_password',
    });
    await sendForgottenPasswordEmail.execute({
      email: 'fake_email@email.com',
    });

    expect(generate).toHaveBeenCalledWith(user.id);
  });
});
