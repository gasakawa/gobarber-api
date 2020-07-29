import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensure-authenticated';
import UsersProfileController from '../controllers/users-profile-controller';

const profileRouter = Router();
const profileController = new UsersProfileController();

profileRouter.post('/', ensureAuthenticated, profileController.update);
profileRouter.get('/', ensureAuthenticated, profileController.show);

export default profileRouter;
