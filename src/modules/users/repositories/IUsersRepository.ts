import User from '../infra/typeorm/schemas/User';

import ICreateUserDTO from '../dtos/ICreateUserDTO';

export default interface IUsersRepository {
  findOneById(id: string): Promise<User | undefined>;

  findByEmail(email: string): Promise<User | undefined>;

  create(data: ICreateUserDTO): Promise<User>;

  delete(user: User): Promise<void>;
}
