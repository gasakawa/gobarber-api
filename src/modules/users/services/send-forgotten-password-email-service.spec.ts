import FakeMailProvider from '@shared/container/providers/mail-provider/fakes/fake-mail-provider';
import AppError from '@shared/errors/app-error';
import FakeUsersRepository from '../repositories/fakes/fake-users-repository';
import SendForgottenEmailService from './send-forgotten-password-email-service';

describe('SendForgottenPasswordEmail', () => {
  it('should be able to recover the user password using the email', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeMailProvider = new FakeMailProvider();

    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    const sendForgottenPasswordEmail = new SendForgottenEmailService(fakeUsersRepository, fakeMailProvider);

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
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeMailProvider = new FakeMailProvider();

    const sendForgottenPasswordEmail = new SendForgottenEmailService(fakeUsersRepository, fakeMailProvider);

    await expect(
      sendForgottenPasswordEmail.execute({
        email: 'fake_email@email.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
