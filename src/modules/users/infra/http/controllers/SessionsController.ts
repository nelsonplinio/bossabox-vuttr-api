import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AuthenticationUserService from '@modules/users/services/AuthenticationUserService';

export default class SessionsController {
  async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authUser = container.resolve(AuthenticationUserService);

    const authResponse = await authUser.execute({ email, password });

    return response.json(authResponse);
  }
}
