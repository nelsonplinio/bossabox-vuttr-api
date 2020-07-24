import Tool from '../infra/typeorm/schemas/Tool';

import IFindAllDTO from '../dtos/IFindAllDTO';
import ICreateToolDTO from '../dtos/ICreateToolDTO';

export default interface IToolsRepository {
  findAll(data: IFindAllDTO): Promise<Tool[]>;

  findOneById(id: string): Promise<Tool | undefined>;

  create(data: ICreateToolDTO): Promise<Tool>;

  delete(tool: Tool): Promise<void>;
}
