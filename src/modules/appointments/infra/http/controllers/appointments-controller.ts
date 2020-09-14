import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateAppointmentService from '@modules/appointments/services/create-appointment-service';

export default class ApointmentController {
  public async create(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;
    const { provider_id, date } = req.body;

    const createAppointmentService = container.resolve(CreateAppointmentService);

    const appointment = await createAppointmentService.execute({ date, provider_id, user_id });

    return res.json(appointment);
  }
}
