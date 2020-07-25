import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let hashProvider: IHashProvider;
let fakeUsersRepository: FakeUsersRepository;
let createUserService: CreateUserService;

describe('authenticationUserService', () => {
  beforeEach(() => {
    hashProvider = new FakeHashProvider();
    fakeUsersRepository = new FakeUsersRepository();
    createUserService = new CreateUserService(
      fakeUsersRepository,
      hashProvider,
    );
  });

  it('should be able to create user', async () => {
    const user = await createUserService.execute({
      name: 'user',
      email: 'user@email.com',
      password: 'password',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create user with email not available', async () => {
    await createUserService.execute({
      name: 'user',
      email: 'user@email.com',
      password: 'password',
    });
    await expect(
      createUserService.execute({
        name: 'user',
        email: 'user@email.com',
        password: 'password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
