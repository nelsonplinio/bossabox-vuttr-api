import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import AuthenticationUserService from './AuthenticationUserService';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let hashProvider: IHashProvider;
let fakeUsersRepository: FakeUsersRepository;
let authenticationUserService: AuthenticationUserService;

describe('authenticationUserService', () => {
  beforeEach(() => {
    hashProvider = new FakeHashProvider();
    fakeUsersRepository = new FakeUsersRepository();
    authenticationUserService = new AuthenticationUserService(
      hashProvider,
      fakeUsersRepository,
    );
  });

  it('should be able to login user', async () => {
    await fakeUsersRepository.create({
      name: 'user',
      email: 'user@email.com',
      password: 'password',
    });

    const authResponse = await authenticationUserService.execute({
      email: 'user@email.com',
      password: 'password',
    });

    expect(authResponse).toHaveProperty('token');
  });

  it('should not be able to login with email not registered', async () => {
    await expect(
      authenticationUserService.execute({
        email: 'user@email.com',
        password: 'password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to login with wrong password', async () => {
    await fakeUsersRepository.create({
      name: 'user',
      email: 'user@email.com',
      password: 'password',
    });

    await expect(
      authenticationUserService.execute({
        email: 'user@email.com',
        password: 'wrong_password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
