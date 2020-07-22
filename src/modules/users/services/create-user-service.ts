import { hash } from 'bcrypt';
import User from '@modules/users/infra/typeorm/entities/user';
import AppError from '@shared/errors/app-error';
import { IUsersRepository } from '../repositories/iusers-repository';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

export default class CreateUserService {
  constructor(private usersRepository: IUsersRepository) {}

  public async execute({ name, email, password }: IRequest): Promise<User> {
    // check if user already exists
    const checkIfUsersExists = await this.usersRepository.findByEmail(email);

    if (checkIfUsersExists) {
      throw new AppError('Email address already used');
    }

    const hashedPassword = await hash(password, 12);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    delete user.password;

    return user;
  }
}
