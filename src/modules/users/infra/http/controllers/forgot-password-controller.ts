import { Request, Response } from 'express';
import { container } from 'tsyringe';
import SendForgottenPasswordEmailService from '@modules/users/services/send-forgotten-password-email-service';

export default class ForgotPasswordController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email } = req.body;

    const sendForgotPasswordEmail = container.resolve(SendForgottenPasswordEmailService);

    await sendForgotPasswordEmail.execute({ email });

    return res.status(204).json();
  }
}
