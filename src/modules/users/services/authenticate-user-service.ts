import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import User from '@modules/users/infra/typeorm/entities/user';
import authConfig from '@config/auth';

import AppError from '@shared/errors/app-error';
import { IUsersRepository } from '../repositories/iusers-repository';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

export default class AuthenticateUserService {
  constructor(private usersRepository: IUsersRepository) {}

  public async execute({ email, password }: Request): Promise<Response> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return {
      user,
      token,
    };
  }
}
