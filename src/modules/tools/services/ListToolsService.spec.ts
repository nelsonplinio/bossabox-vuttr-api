import 'reflect-metadata';
import FakeToolsRepository from '../repositories/fakes/FakeToolsRepository';
import ListToolsService from './ListToolsService';

let fakeToolsRepository: FakeToolsRepository;
let listToolsService: ListToolsService;

describe('ListToolService', () => {
  beforeEach(() => {
    fakeToolsRepository = new FakeToolsRepository();
    listToolsService = new ListToolsService(fakeToolsRepository);
  });

  it('should be able to list all tools', async () => {
    const toolsToSave = [
      {
        title: 'hotel',
        user_id: 'user_id',
        link: 'https://github.com/typicode/hotel',
        description:
          'Local app manager. Start apps within your browser, developer tool with local .localhost domain and https out of the box.',
        tags: ['proxy'],
      },
      {
        title: 'hotel',
        user_id: 'user_id',
        link: 'https://github.com/typicode/hotel',
        description:
          'Local app manager. Start apps within your browser, developer tool with local .localhost domain and https out of the box.',
        tags: ['node'],
      },
    ];

    const toolsCreated = await Promise.all(
      toolsToSave.map(tool => fakeToolsRepository.create(tool)),
    );

    const tools = await listToolsService.execute({ user_id: 'user_id' });

    expect(tools).toEqual(expect.arrayContaining(toolsCreated));
  });

  it('should be able to list all tools with tag filter', async () => {
    const toolsToSave = [
      {
        title: 'hotel',
        user_id: 'user_id',
        link: 'https://github.com/typicode/hotel',
        description:
          'Local app manager. Start apps within your browser, developer tool with local .localhost domain and https out of the box.',
        tags: ['proxy'],
      },
      {
        title: 'hotel',
        user_id: 'user_id',
        link: 'https://github.com/typicode/hotel',
        description:
          'Local app manager. Start apps within your browser, developer tool with local .localhost domain and https out of the box.',
        tags: ['node'],
      },
    ];

    const [, toolWithTag] = await Promise.all(
      toolsToSave.map(tool => fakeToolsRepository.create(tool)),
    );

    const tools = await listToolsService.execute({
      tag: 'node',
      user_id: 'user_id',
    });

    expect(tools).toEqual(expect.arrayContaining([toolWithTag]));
  });

  it('should not be able to list all tools with other user_id', async () => {
    const toolsToSave = [
      {
        title: 'hotel',
        user_id: 'user_id',
        link: 'https://github.com/typicode/hotel',
        description:
          'Local app manager. Start apps within your browser, developer tool with local .localhost domain and https out of the box.',
        tags: ['proxy'],
      },
      {
        title: 'hotel',
        user_id: 'user_id',
        link: 'https://github.com/typicode/hotel',
        description:
          'Local app manager. Start apps within your browser, developer tool with local .localhost domain and https out of the box.',
        tags: ['node'],
      },
    ];

    await Promise.all(
      toolsToSave.map(tool => fakeToolsRepository.create(tool)),
    );

    const tools = await listToolsService.execute({
      tag: 'node',
      user_id: 'other_user_id',
    });

    expect(tools).toEqual(expect.arrayContaining([]));
  });
});
