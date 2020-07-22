import { getRepository, Repository } from 'typeorm';

import { IUsersRepository } from '@modules/users/repositories/iusers-repository';
import ICreateUserDTO from '@modules/users/dtos/icreate-user-dto';
import User from '../entities/user';

export default class UsersRepository implements IUsersRepository {
  private readonly ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(id);
    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: {
        email,
      },
    });
    return user;
  }

  public async create({ name, email, password }: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create({ name, email, password });
    await this.ormRepository.save(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }
}
