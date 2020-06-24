import { getRepository } from 'typeorm';
import User from '../models/user-model';

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
      throw new Error('Email address already used');
    }

    const user = usersRepository.create({
      name,
      email,
      password,
    });

    await usersRepository.save(user);

    return user;
  }
}
