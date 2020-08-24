import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensure-authenticated';
import ProvidersController from '../controllers/provider-controller';
import ProviderMonthAvailabilityController from '../controllers/provider-month-availability-controller';
import ProviderDayAvailabilityController from '../controllers/provider-day-availability-controller';

const providersRouter = Router();
const providersController = new ProvidersController();
const providerMonthAvailabilityController = new ProviderMonthAvailabilityController();
const providerDayAvailabilityController = new ProviderDayAvailabilityController();

// putting the middleware to check authentication to all routes
providersRouter.use(ensureAuthenticated);

providersRouter.get('/', providersController.index);
providersRouter.get('/:provider_id/month-availability', providerMonthAvailabilityController.index);
providersRouter.get('/:provider_id/day-availability', providerDayAvailabilityController.index);

export default providersRouter;
