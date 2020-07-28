import { getRepository, Repository } from 'typeorm';

import IUserTokensRepository from '@modules/users/repositories/iuser-tokens-repository';

import UserToken from '../entities/user-tokens';

export default class UserTokensRepository implements IUserTokensRepository {
  private readonly ormRepository: Repository<UserToken>;

  constructor() {
    this.ormRepository = getRepository(UserToken);
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const user = await this.ormRepository.findOne({
      where: { token },
    });
    return user;
  }

  public async generate(user_id: string): Promise<UserToken> {
    const user = this.ormRepository.create({
      user_id,
    });
    await this.ormRepository.save(user);

    return user;
  }
}
