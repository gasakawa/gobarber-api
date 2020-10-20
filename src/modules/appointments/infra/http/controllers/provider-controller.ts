import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderService from '@modules/appointments/services/list-provider-service';
import { classToClass } from 'class-transformer';

export default class ProvidersController {
  public async index(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;

    const listProviders = container.resolve(ListProviderService);

    const providers = await listProviders.execute(user_id);

    return res.json(classToClass(providers));
  }
}
