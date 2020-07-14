import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import User from '../infra/typeorm/entities/user';
import uploadConfig from '../../../config/upload';
import AppError from '../../../shared/errors/app-error';

interface Request {
  user_id: string;
  avatarFilename: string;
}

export default class UpdateUserAvatarService {
  public async execute({ user_id, avatarFilename }: Request): Promise<User> {
    const userRepository = getRepository(User);

    const [user] = await userRepository.findByIds([user_id]);

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

    await userRepository.save(user);

    delete user.password;

    return user;
  }
}
