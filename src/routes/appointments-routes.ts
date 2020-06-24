import { Router, Request, Response } from 'express';
import { parseISO } from 'date-fns';

import { getCustomRepository } from 'typeorm';
import AppointmentRepository from '../repository/appointment-repository';
import CreateAppointmentService from '../services/create-appointment-service';

const appointmentsRouter = Router();

appointmentsRouter.get('/', async (req: Request, res: Response) => {
  const appointmentRepository = getCustomRepository(AppointmentRepository);

  const appointments = await appointmentRepository.find();
  return res.json(appointments);
});

appointmentsRouter.post('/', async (req: Request, res: Response) => {
  try {
    const { provider, date } = req.body;

    const parsedDate = parseISO(date);

    const createAppointmentService = new CreateAppointmentService();

    const appointment = await createAppointmentService.execute({ date: parsedDate, provider });

    return res.json(appointment);
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
});

export default appointmentsRouter;
