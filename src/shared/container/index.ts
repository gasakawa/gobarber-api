import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import { IAppointmentsRepository } from '@modules/appointments/repositories/iappointments-repository';
import AppoinmentsRepository from '@modules/appointments/infra/typeorm/repositories/appointment-repository';

import { IUsersRepository } from '@modules/users/repositories/iusers-repository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/users-repository';
import IUserTokensRepository from '@modules/users/repositories/iuser-tokens-repository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/user-tokens-repository';

container.registerSingleton<IAppointmentsRepository>('AppoinmentsRepository', AppoinmentsRepository);
container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository);
container.registerSingleton<IUserTokensRepository>('UserTokensRepository', UserTokensRepository);
