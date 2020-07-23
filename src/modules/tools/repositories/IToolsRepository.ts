import Tool from '../infra/typeorm/schemas/Tool';

import IFindAllDTO from '../dtos/IFindAllDTO';
import ICreateToolDTO from '../dtos/ICreateToolDTO';

export default interface IToolsRepository {
  findAll(data: IFindAllDTO): Promise<Tool[]>;

  create(data: ICreateToolDTO): Promise<Tool>;

  deleteById(id: string): Promise<void>;
}
