import { container } from 'tsyringe';

import '@modules/users/providers';

import { IAppointmentsRepository } from '@modules/appointments/repositories/iappointments-repository';
import AppoinmentsRepository from '@modules/appointments/infra/typeorm/repositories/appointment-repository';
import { IUsersRepository } from '@modules/users/repositories/iusers-repository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/users-repository';

container.registerSingleton<IAppointmentsRepository>('AppoinmentsRepository', AppoinmentsRepository);
container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository);
