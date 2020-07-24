import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import IUsersRepository from '../repositories/IUsersRepository';
import User from '../infra/typeorm/schemas/User';

interface IRequest {
  email: string;
  name: string;
  password: string;
}
@injectable()
export default class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ email, password, name }: IRequest): Promise<User> {
    const checkIfEmailAvailable = await this.usersRepository.findByEmail(email);

    if (checkIfEmailAvailable) {
      throw new AppError('Email does not available!');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }
}
