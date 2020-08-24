import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderDayAvailabilityService from '@modules/appointments/services/list-provider-day-availability-service';

export default class ProviderDayAvailabilityController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { month, year, day } = req.body;
    const { provider_id } = req.params;

    const listProviders = container.resolve(ListProviderDayAvailabilityService);

    const providers = await listProviders.execute({ provider_id, month, year, day });

    return res.json(providers);
  }
}
