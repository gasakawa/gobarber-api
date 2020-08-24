import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderAppointmentsService from '@modules/appointments/services/list-provider-appointments-service';

export default class ProviderAppointmentsController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { month, year, day } = req.body;
    const provider_id = req.user.id;

    const appointments = container.resolve(ListProviderAppointmentsService);

    const providers = await appointments.execute({ provider_id, month, year, day });

    return res.json(providers);
  }
}
