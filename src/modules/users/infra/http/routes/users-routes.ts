import { Router } from 'express';
import multer from 'multer';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensure-authenticated';
import uploadConfig from '@config/upload';
import { celebrate, Segments, Joi } from 'celebrate';
import UsersController from '../controllers/users-controller.';
import UserAvatarController from '../controllers/users-avatar-controller';

const usersRouter = Router();
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

const upload = multer(uploadConfig.multer);

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  usersController.create,
);

usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'), userAvatarController.update);

export default usersRouter;
