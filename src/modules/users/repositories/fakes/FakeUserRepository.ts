import { uuid } from 'uuidv4';
import User from '@modules/users/infra/typeorm/schemas/User';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IUsersRepository from '../IUsersRepository';

export default class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  async findOneById(id: string): Promise<User | undefined> {
    return this.users.find(user => user.id === id);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find(user => user.email === email);
  }

  async create({ name, password, email }: ICreateUserDTO): Promise<User> {
    const user: User = {
      name,
      password,
      email,
      id: uuid(),
      created_at: new Date(Date.now()),
      updated_at: new Date(Date.now()),
    };

    this.users.push(user);

    return user;
  }

  async delete(user: User): Promise<void> {
    this.users = this.users.filter(({ id }) => id !== user.id);
  }
}
