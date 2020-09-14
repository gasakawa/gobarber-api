import { inject, injectable } from 'tsyringe';
import User from '@modules/users/infra/typeorm/entities/user';
import AppError from '@shared/errors/app-error';
import ICacheProvider from '@shared/container/providers/cache-provider/models/icache-provider';
import { IUsersRepository } from '../repositories/iusers-repository';
import IHashProvider from '../providers/hash-provider/models/ihash-provider';

interface IRequest {
  name: string;
  email: string;
  password: string;
}
@injectable()
export default class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ name, email, password }: IRequest): Promise<User> {
    // check if user already exists
    const checkIfUsersExists = await this.usersRepository.findByEmail(email);

    if (checkIfUsersExists) {
      throw new AppError('Email address already used');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await this.cacheProvider.invalidatePrefix('providers-list');

    // delete user.password;

    return user;
  }
}
