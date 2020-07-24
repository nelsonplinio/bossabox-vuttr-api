import { inject, injectable } from 'tsyringe';
import { sign } from 'jsonwebtoken';

import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import IUsersRepository from '../repositories/IUsersRepository';
import User from '../infra/typeorm/schemas/User';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

@injectable()
export default class AuthenticationUserService {
  constructor(
    @inject('HashProvider')
    private hashProvider: IHashProvider,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    const checkPassword = await this.hashProvider.compareHash(
      password,
      user.password,
    );

    if (!checkPassword) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;
    console.log(secret, typeof user.id);
    const token = sign({}, secret, {
      subject: String(user.id),
      expiresIn,
    });

    return {
      token,
      user,
    };
  }
}
