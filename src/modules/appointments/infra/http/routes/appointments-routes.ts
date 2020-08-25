import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensure-authenticated';
import AppointmentsController from '../controllers/appointments-controller';
import ProviderAppointmentsController from '../controllers/provider-appointments-controller';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();
const providerAppointmentsController = new ProviderAppointmentsController();

// putting the middleware to check authentication to all routes
appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.get('/me', providerAppointmentsController.index);
appointmentsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      provider_id: Joi.string().uuid().required(),
      date: Joi.date().required(),
    },
  }),
  appointmentsController.create,
);

export default appointmentsRouter;
