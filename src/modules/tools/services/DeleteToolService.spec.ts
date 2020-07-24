import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import FakeToolsRepository from '../repositories/fakes/FakeToolsRepository';
import DeleteToolService from './DeleteToolService';

let fakeToolsRepository: FakeToolsRepository;
let deleteToolService: DeleteToolService;

describe('DeleteToolService', () => {
  beforeEach(() => {
    fakeToolsRepository = new FakeToolsRepository();
    deleteToolService = new DeleteToolService(fakeToolsRepository);
  });

  it('should be able to delete a tool', async () => {
    const tool = await fakeToolsRepository.create({
      title: 'hotel',
      user_id: 'user_id',
      link: 'https://github.com/typicode/hotel',
      description:
        'Local app manager. Start apps within your browser, developer tool with local .localhost domain and https out of the box.',
      tags: [
        'node',
        'organizing',
        'webapps',
        'domain',
        'developer',
        'https',
        'proxy',
      ],
    });

    await deleteToolService.execute({ id: tool.id, user_id: 'user_id' });

    const tools = await fakeToolsRepository.findAll({ user_id: 'user_id' });

    expect(tools).toEqual(expect.arrayContaining([]));
  });

  it('should not be able to delete a tool with incorrect id', async () => {
    await fakeToolsRepository.create({
      title: 'hotel',
      user_id: 'user_id',
      link: 'https://github.com/typicode/hotel',
      description:
        'Local app manager. Start apps within your browser, developer tool with local .localhost domain and https out of the box.',
      tags: [
        'node',
        'organizing',
        'webapps',
        'domain',
        'developer',
        'https',
        'proxy',
      ],
    });

    await expect(
      deleteToolService.execute({ id: 'incorrect_id', user_id: 'user_id' }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to delete a tool with incorrect user id', async () => {
    const tool = await fakeToolsRepository.create({
      title: 'hotel',
      user_id: 'user_id',
      link: 'https://github.com/typicode/hotel',
      description:
        'Local app manager. Start apps within your browser, developer tool with local .localhost domain and https out of the box.',
      tags: [
        'node',
        'organizing',
        'webapps',
        'domain',
        'developer',
        'https',
        'proxy',
      ],
    });

    await expect(
      deleteToolService.execute({ id: tool.id, user_id: 'incorret_user_id' }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
