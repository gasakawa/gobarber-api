import { uuid } from 'uuidv4';
import UserToken from '@modules/users/infra/typeorm/entities/user-tokens';
import IUserTokensRepository from '../iuser-tokens-repository';

export default class FakeUserTokensRepository implements IUserTokensRepository {
  private users: UserToken[] = [];

  public async generate(user_id: string): Promise<UserToken> {
    const userToken = new UserToken();

    Object.assign(userToken, { id: uuid(), token: uuid(), user_id });

    this.users.push(userToken);

    return userToken;
  }
}
