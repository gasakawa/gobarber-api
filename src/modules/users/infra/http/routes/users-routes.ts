import { Router, Request, Response } from 'express';
import multer from 'multer';
import CreateUserService from '@modules/users/services/create-user-service';
import UpdateUserAvatarService from '@modules/users/services/update-user-avatar-service';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensure-authenticated';
import UsersRepository from '@modules/users/infra/typeorm/repositories/users-repository';
import uploadConfig from '@config/upload';

const usersRouter = Router();

const upload = multer(uploadConfig);

usersRouter.post('/', async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const usersRepository = new UsersRepository();
  const createUser = new CreateUserService(usersRepository);

  const user = await createUser.execute({
    name,
    email,
    password,
  });

  return res.json(user);
});

usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'), async (req: Request, res: Response) => {
  const usersRepository = new UsersRepository();
  const updateUserAvatar = new UpdateUserAvatarService(usersRepository);

  const user = await updateUserAvatar.execute({
    user_id: req.user.id,
    avatarFilename: req.file.filename,
  });

  return res.json(user);
});

export default usersRouter;
