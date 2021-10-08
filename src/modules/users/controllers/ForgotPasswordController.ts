import { Request, Response } from 'express';
import CreateSessionService from '@modules/users/services/CreateSessionService';
import SendForgotPasswordForgotService from '@modules/users/services/SendForgotPasswordForgotService';

export default class ForgotPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const sendForgotPasswordEmail = new SendForgotPasswordForgotService();

    await sendForgotPasswordEmail.execute({
      email,
    });

    return response.status(204).json();
  }
}
