import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/app-error';
import { IUsersRepository } from '../repositories/iusers-repository';
import IUserTokensRepository from '../repositories/iuser-tokens-repository';
import IHashProvider from '../providers/hash-provider/models/ihash-provider';

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
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.userTokensRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('User token does not exists');
    }

    const user = await this.usersRepository.findById(userToken.user_id);

    if (user) {
      user.password = await this.hashProvider.generateHash(password);
      await this.usersRepository.save(user);
    }
  }
}
