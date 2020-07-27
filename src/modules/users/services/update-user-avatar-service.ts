import { inject, injectable } from 'tsyringe';
import User from '@modules/users/infra/typeorm/entities/user';

import AppError from '@shared/errors/app-error';
import IStorageProvider from '@shared/container/providers/storage-provider/models/istorage-provider';
import { IUsersRepository } from '../repositories/iusers-repository';

interface IRequest {
  user_id: string;
  avatarFilename: string;
}
@injectable()
export default class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Only authenticated users can update avatar', 401);
    }

    if (user.avatar) {
      await this.storageProvider.deleteFile(user.avatar);
    }

    const filename = await this.storageProvider.saveFile(avatarFilename);

    user.avatar = filename;

    await this.usersRepository.save(user);

    delete user.password;

    return user;
  }
}
