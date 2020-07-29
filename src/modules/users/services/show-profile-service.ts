import { inject, injectable } from 'tsyringe';
import User from '@modules/users/infra/typeorm/entities/user';

import AppError from '@shared/errors/app-error';
import { IUsersRepository } from '../repositories/iusers-repository';

@injectable()
export default class ShowProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(user_id: string): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found');
    }

    return user;
  }
}
