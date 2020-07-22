import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensure-authenticated';
import AppointmentsController from '../controllers/appointments-controller';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();

// putting the middleware to check authentication to all routes
appointmentsRouter.use(ensureAuthenticated);

// appointmentsRouter.get('/', async (req: Request, res: Response) => {
//   const appointmentRepository = getCustomRepository(AppointmentRepository);

//   const appointments = await appointmentRepository.find();
//   return res.json(appointments);
// });

appointmentsRouter.post('/', appointmentsController.create);

export default appointmentsRouter;
