import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensure-authenticated';
import ProvidersController from '../controllers/provider-controller';

const providersRouter = Router();
const providersController = new ProvidersController();

// putting the middleware to check authentication to all routes
providersRouter.use(ensureAuthenticated);

providersRouter.get('/', providersController.index);

export default providersRouter;
