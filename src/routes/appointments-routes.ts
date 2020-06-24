import { Router, Request, Response } from 'express';
import { parseISO } from 'date-fns';

import AppointmentRepository from '../repository/appointment-repository';
import CreateAppointmentService from '../services/create-appointment-service';

const appointmentsRouter = Router();
const appointmenRepository = new AppointmentRepository();

appointmentsRouter.get('/', (req: Request, res: Response) => {
  const appointments = appointmenRepository.all();
  return res.json(appointments);
});

appointmentsRouter.post('/', (req: Request, res: Response) => {
  try {
    const { provider, date } = req.body;

    const parsedDate = parseISO(date);

    const createAppointmentService = new CreateAppointmentService(appointmenRepository);

    const appointment = createAppointmentService.execute({ date: parsedDate, provider });

    return res.json(appointment);
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
});

export default appointmentsRouter;
