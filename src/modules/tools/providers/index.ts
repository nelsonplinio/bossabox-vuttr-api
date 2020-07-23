import { container } from 'tsyringe';

import IToolsRepository from '../repositories/IToolsRepository';
import ToolsRepository from '../infra/typeorm/repositories/ToolsRepository';

container.registerSingleton<IToolsRepository>(
  'ToolsRepository',
  ToolsRepository,
);
