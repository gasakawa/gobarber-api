import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensure-authenticated';
import { celebrate, Segments, Joi } from 'celebrate';
import UsersProfileController from '../controllers/users-profile-controller';

const profileRouter = Router();
const profileController = new UsersProfileController();

profileRouter.get('/', ensureAuthenticated, profileController.show);
profileRouter.put(
  '/',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      old_password: Joi.string(),
      password: Joi.string(),
      password_confirmation: Joi.string().valid(Joi.ref('password')),
    },
  }),
  profileController.update,
);

export default profileRouter;
