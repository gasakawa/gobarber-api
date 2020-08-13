import User from '../infra/typeorm/entities/user';
import ICreateUserDTO from '../dtos/icreate-user-dto';
import IFindAllProvidersDTO from '../dtos/ifind-all-providers-dto';

export interface IUsersRepository {
  findByEmail: (email: string) => Promise<User | undefined>;
  findById: (id: string) => Promise<User | undefined>;
  create: (user: ICreateUserDTO) => Promise<User>;
  save: (user: User) => Promise<User>;
  findAllProviders: (data: IFindAllProvidersDTO) => Promise<User[]>;
}
