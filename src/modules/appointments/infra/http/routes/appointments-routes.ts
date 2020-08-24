import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensure-authenticated';
import AppointmentsController from '../controllers/appointments-controller';
import ProviderAppointmentsController from '../controllers/provider-appointments-controller';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();
const providerAppointmentsController = new ProviderAppointmentsController();

// putting the middleware to check authentication to all routes
appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.get('/me', providerAppointmentsController.index);
appointmentsRouter.post('/', appointmentsController.create);

export default appointmentsRouter;
