import { MongoRepository, getMongoRepository, FindManyOptions } from 'typeorm';
import IToolsRepository from '@modules/tools/repositories/IToolsRepository';
import ICreateToolDTO from '@modules/tools/dtos/ICreateToolDTO';
import IFindAllDTO from '@modules/tools/dtos/IFindAllDTO';
import Tool from '@modules/tools/infra/typeorm/schemas/Tool';

export default class ToolsRepository implements IToolsRepository {
  private ormRepository: MongoRepository<Tool>;

  constructor() {
    this.ormRepository = getMongoRepository(Tool);
  }

  async findAll({ tag }: IFindAllDTO): Promise<Tool[]> {
    let queryOptions: FindManyOptions<Tool> | undefined;

    if (tag) {
      queryOptions = {
        where: {
          tags: { $all: [tag] },
        },
      };
    }

    const tools = await this.ormRepository.find(queryOptions);

    return tools;
  }

  async create({
    description,
    link,
    tags,
    title,
  }: ICreateToolDTO): Promise<Tool> {
    const tool = this.ormRepository.create({
      title,
      description,
      link,
      tags,
    });

    await this.ormRepository.save(tool);

    return tool;
  }

  async deleteById(id: string): Promise<void> {
    const tool = await this.ormRepository.findOne(id);

    if (!tool) {
      return;
    }

    await this.ormRepository.delete(tool);
  }
}
