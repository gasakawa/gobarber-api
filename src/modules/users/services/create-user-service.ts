import { getRepository } from 'typeorm';
import { hash } from 'bcrypt';
import User from '../infra/typeorm/entities/user';
import AppError from '../../../shared/errors/app-error';

interface Request {
  name: string;
  email: string;
  password: string;
}

export default class CreateUserService {
  public async execute({ name, email, password }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    // check if user already exists
    const checkIfUsersExists = await usersRepository.findOne({
      where: { email },
    });

    if (checkIfUsersExists) {
      throw new AppError('Email address already used');
    }

    const hashedPassword = await hash(password, 12);

    const user = usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await usersRepository.save(user);

    delete user.password;

    return user;
  }
}
