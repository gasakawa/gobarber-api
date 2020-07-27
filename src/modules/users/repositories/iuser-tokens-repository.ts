import UserToken from '../infra/typeorm/entities/user-tokens';

export default interface IUserTokensRepository {
  generate: (user_id: string) => Promise<UserToken>;
}
