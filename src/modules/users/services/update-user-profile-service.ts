import { inject, injectable } from 'tsyringe';
import User from '@modules/users/infra/typeorm/entities/user';

import AppError from '@shared/errors/app-error';
import { IUsersRepository } from '../repositories/iusers-repository';
import IHashProvider from '../providers/hash-provider/models/ihash-provider';

interface IRequest {
  name: string;
  email: string;
  password?: string;
  old_password?: string;
  user_id: string;
}

@injectable()
export default class UpdateUserProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute(data: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(data.user_id);

    if (!user) {
      throw new AppError('User not found');
    }

    const userWithUpdatedEmail = await this.usersRepository.findByEmail(user.email);

    if (userWithUpdatedEmail && userWithUpdatedEmail.email !== data.email) {
      throw new AppError('E-mail already in use');
    }

    user.name = data.name;
    user.email = data.email;

    if (data.password && !data.old_password) {
      throw new AppError('You should inform your old password');
    }

    if (data.password && data.old_password) {
      const checkOldPassword = await this.hashProvider.compareHash(data.old_password, user.password);
      if (!checkOldPassword) {
        throw new AppError('Old password does not match');
      }
    }

    if (data.password) {
      user.password = await this.hashProvider.generateHash(data.password);
    }

    return this.usersRepository.save(user);
  }
}
