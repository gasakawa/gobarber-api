import { inject, injectable } from 'tsyringe';

import IMailProvider from '@shared/container/providers/mail-provider/models/imail-provider';
import AppError from '@shared/errors/app-error';
import { IUsersRepository } from '../repositories/iusers-repository';
import IUserTokensRepository from '../repositories/iuser-tokens-repository';

interface IRequest {
  email: string;
}
@injectable()
export default class SendForgottenPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('MailProvider')
    private mailProvider: IMailProvider,
    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User does not exists');
    }

    await this.userTokensRepository.generate(user.id);

    this.mailProvider.sendMail(email, 'recover your password');
  }
}
