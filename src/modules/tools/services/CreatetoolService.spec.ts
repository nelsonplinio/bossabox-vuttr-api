import 'reflect-metadata';
import FakeToolsRepository from '../repositories/fakes/FakeToolsRepository';
import CreateToolService from './CreateToolService';

let fakeToolsRepository: FakeToolsRepository;
let createToolService: CreateToolService;

describe('CreateToolService', () => {
  beforeEach(() => {
    fakeToolsRepository = new FakeToolsRepository();
    createToolService = new CreateToolService(fakeToolsRepository);
  });

  it('should be able to create a tool', async () => {
    const tool = {
      title: 'hotel',
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
    };

    const toolCreated = await createToolService.execute(tool);

    expect(toolCreated).toHaveProperty('id');
  });
});
