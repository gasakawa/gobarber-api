import { Router } from 'express';
import multer from 'multer';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensure-authenticated';
import uploadConfig from '@config/upload';
import UsersController from '../controllers/users-controller.';

const usersRouter = Router();
const usersController = new UsersController();

const upload = multer(uploadConfig);

usersRouter.post('/', usersController.create);

usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'), usersController.updateAvatar);

export default usersRouter;
