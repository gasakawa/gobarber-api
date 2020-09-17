import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderMonthAvailabilityService from '@modules/appointments/services/list-provider-month-availability-service';

export default class ProviderMonthAvailabilityController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { month, year } = req.query;
    const { provider_id } = req.params;

    const listProviders = container.resolve(ListProviderMonthAvailabilityService);

    const availability = await listProviders.execute({ provider_id, month: Number(month), year: Number(year) });

    return res.json(availability);
  }
}
