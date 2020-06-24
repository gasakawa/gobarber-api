import { Router, Request, Response } from 'express';
import AuthenticateUserService from '../services/authenticate-user-service';

const sessionsRouter = Router();

sessionsRouter.post('/', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const authenticateUser = new AuthenticateUserService();

    const { user } = await authenticateUser.execute({
      email,
      password,
    });

    return res.json({ user });
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
});

export default sessionsRouter;
