import { Router, Request, Response } from 'express';
import multer from 'multer';
import CreateUserService from '../services/create-user-service';
import ensureAuthenticated from '../middlewares/ensure-authenticated';
import uploadConfig from '../config/upload';

const usersRouter = Router();

const upload = multer(uploadConfig);

usersRouter.post('/', async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    return res.json(user);
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
});

usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'), async (req: Request, res: Response) => {
  console.log(req.file);
  return res.json({ ok: true });
});

export default usersRouter;
