// import 'reflect-metadata';
// import AppError from '@shared/errors/AppError';
// import FakeToolsRepository from '../repositories/fakes/FakeToolsRepository';
// import DeleteToolService from './DeleteToolService';

// let fakeToolsRepository: FakeToolsRepository;
// let deleteToolService: DeleteToolService;

// describe('DeleteToolService', () => {
//   beforeEach(() => {
//     fakeToolsRepository = new FakeToolsRepository();
//     deleteToolService = new DeleteToolService(fakeToolsRepository);
//   });

//   it('should be able to delete a tool', async () => {
//     const tool = await fakeToolsRepository.create({
//       title: 'hotel',
//       link: 'https://github.com/typicode/hotel',
//       description:
//         'Local app manager. Start apps within your browser, developer tool with local .localhost domain and https out of the box.',
//       tags: [
//         'node',
//         'organizing',
//         'webapps',
//         'domain',
//         'developer',
//         'https',
//         'proxy',
//       ],
//     });

//     await deleteToolService.execute({ id: tool.id });

//     const tools = await fakeToolsRepository.findAll();

//     expect(tools).toEqual(expect.arrayContaining([]));
//   });

//   it('should not  be able to delete a tool with incorrect id', async () => {
//     await fakeToolsRepository.create({
//       title: 'hotel',
//       link: 'https://github.com/typicode/hotel',
//       description:
//         'Local app manager. Start apps within your browser, developer tool with local .localhost domain and https out of the box.',
//       tags: [
//         'node',
//         'organizing',
//         'webapps',
//         'domain',
//         'developer',
//         'https',
//         'proxy',
//       ],
//     });

//     await expect(
//       deleteToolService.execute({ id: 'incorrect_id' }),
//     ).rejects.toBeInstanceOf(AppError);
//   });
// });
