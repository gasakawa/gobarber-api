import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '../repositories/iusers-repository';

@injectable()
export default class SendForgottenEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(): Promise<void> {}
}
