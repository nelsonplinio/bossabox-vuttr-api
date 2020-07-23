import Tool from '../infra/typeorm/schemas/Tool';

import ICreateToolDTO from '../dtos/ICreateToolDTO';

export default interface IToolsRepository {
  findAll(): Promise<Tool[]>;

  findAllByTag(tag: string): Promise<Tool[]>;

  create(data: ICreateToolDTO): Promise<Tool>;

  deleteById(id: string): Promise<void>;
}
