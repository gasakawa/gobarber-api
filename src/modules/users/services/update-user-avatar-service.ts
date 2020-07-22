import path from 'path';
import fs from 'fs';
import User from '@modules/users/infra/typeorm/entities/user';
import uploadConfig from '@config/upload';
import AppError from '@shared/errors/app-error';
import { IUsersRepository } from '../repositories/iusers-repository';

interface IRequest {
  user_id: string;
  avatarFilename: string;
}

export default class UpdateUserAvatarService {
  constructor(private usersRepository: IUsersRepository) {}

  public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Only authenticated users can update avatar', 401);
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);
      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFilename;

    await this.usersRepository.save(user);

    delete user.password;

    return user;
  }
}
