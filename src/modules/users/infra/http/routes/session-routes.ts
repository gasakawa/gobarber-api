import { Router, Request, Response } from 'express';
import AuthenticateUserService from '@modules/users/services/authenticate-user-service';
import UsersRepository from '@modules/users/infra/typeorm/repositories/users-repository';

const sessionsRouter = Router();

sessionsRouter.post('/', async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const usersRepository = new UsersRepository();

  const authenticateUser = new AuthenticateUserService(usersRepository);

  const { user, token } = await authenticateUser.execute({
    email,
    password,
  });

  return res.json({ user, token });
});

export default sessionsRouter;
