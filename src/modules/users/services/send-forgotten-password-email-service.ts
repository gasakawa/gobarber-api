import { inject, injectable } from 'tsyringe';

import IMailProvider from '@shared/container/providers/mail-provider/models/imail-provider';
import AppError from '@shared/errors/app-error';
import { IUsersRepository } from '../repositories/iusers-repository';

interface IRequest {
  email: string;
}
@injectable()
export default class SendForgottenEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    const findUser = await this.usersRepository.findByEmail(email);

    if (!findUser) {
      throw new AppError('User does not exists');
    }
    this.mailProvider.sendMail(email, 'recover your password');
  }
}
