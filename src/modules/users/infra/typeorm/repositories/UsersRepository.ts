import { MongoRepository, getMongoRepository } from 'typeorm';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import User from '../schemas/User';

export default class UsersRepository implements IUsersRepository {
  private ormRepository: MongoRepository<User>;

  constructor() {
    this.ormRepository = getMongoRepository(User);
  }

  async findOneById(id: string): Promise<User | undefined> {
    const user = this.ormRepository.findOne(id);
    return user;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = this.ormRepository.findOne({
      where: { email },
    });

    return user;
  }

  async create({ email, password, name }: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create({
      email,
      password,
      name,
    });

    await this.ormRepository.save(user);

    return user;
  }

  async delete(user: User): Promise<void> {
    await this.ormRepository.delete(user);
  }
}
