import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ListProviderAppointmentsService from '@modules/appointments/services/list-provider-appointments-service';

export default class ProviderAppointmentsController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { month, year, day } = req.query;
    const provider_id = req.user.id;

    const appointments = container.resolve(ListProviderAppointmentsService);

    const providers = await appointments.execute({
      provider_id,
      month: Number(month),
      year: Number(year),
      day: Number(day),
    });

    return res.json(classToClass(providers));
  }
}
