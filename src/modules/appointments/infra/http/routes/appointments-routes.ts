import { Router, Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';

import CreateAppointmentService from '@modules/appointments/services/create-appointment-service';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensure-authenticated';

const appointmentsRouter = Router();

// putting the middleware to check authentication to all routes
appointmentsRouter.use(ensureAuthenticated);

// appointmentsRouter.get('/', async (req: Request, res: Response) => {
//   const appointmentRepository = getCustomRepository(AppointmentRepository);

//   const appointments = await appointmentRepository.find();
//   return res.json(appointments);
// });

appointmentsRouter.post('/', async (req: Request, res: Response) => {
  const { provider_id, date } = req.body;

  const parsedDate = parseISO(date);

  const createAppointmentService = container.resolve(CreateAppointmentService);

  const appointment = await createAppointmentService.execute({ date: parsedDate, provider_id });

  return res.json(appointment);
});

export default appointmentsRouter;
