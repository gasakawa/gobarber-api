import { getRepository } from 'typeorm';
import { compare } from 'bcrypt';
import User from '../models/user-model';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
}

export default class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne({ where: { email } });

    if (!user) {
      throw new Error('Incorrect email/password combination');
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new Error('Incorrect email/password combination');
    }

    delete user.password;

    return {
      user,
    };
  }
}
