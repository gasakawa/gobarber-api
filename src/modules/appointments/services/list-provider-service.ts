import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '@modules/users/repositories/iusers-repository';
import User from '@modules/users/infra/typeorm/entities/user';

@injectable()
export default class ListProviderService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(user_id: string): Promise<User[]> {
    const users = await this.usersRepository.findAllProviders({ except_user_id: user_id });

    return users;
  }
}
