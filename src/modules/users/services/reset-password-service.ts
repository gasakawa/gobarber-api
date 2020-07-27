import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/app-error';
import { IUsersRepository } from '../repositories/iusers-repository';
import IUserTokensRepository from '../repositories/iuser-tokens-repository';

interface IRequest {
  token: string;
  password: string;
}
@injectable()
export default class ResetPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
  ) {}

  public async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.userTokensRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('User token does not exists');
    }

    const user = await this.usersRepository.findById(userToken.user_id);

    if (user) {
      user.password = password;
      await this.usersRepository.save(user);
    }
  }
}
