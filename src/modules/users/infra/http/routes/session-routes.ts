import { Router, Request, Response } from 'express';
import { container } from 'tsyringe';
import AuthenticateUserService from '@modules/users/services/authenticate-user-service';

const sessionsRouter = Router();

sessionsRouter.post('/', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const authenticateUser = container.resolve(AuthenticateUserService);

  const { user, token } = await authenticateUser.execute({
    email,
    password,
  });

  return res.json({ user, token });
});

export default sessionsRouter;
