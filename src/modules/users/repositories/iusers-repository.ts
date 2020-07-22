import User from '../infra/typeorm/entities/user';
import ICreateUserDTO from '../dtos/icreate-user-dto';

export interface IUsersRepository {
  findByEmail: (email: string) => Promise<User | undefined>;
  findById: (id: string) => Promise<User | undefined>;
  create: (user: ICreateUserDTO) => Promise<User>;
  save: (user: User) => Promise<User>;
}
