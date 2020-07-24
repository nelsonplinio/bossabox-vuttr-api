import { MongoRepository, getMongoRepository } from 'typeorm';
import IToolsRepository from '@modules/tools/repositories/IToolsRepository';
import ICreateToolDTO from '@modules/tools/dtos/ICreateToolDTO';
import IFindAllDTO from '@modules/tools/dtos/IFindAllDTO';
import Tool from '@modules/tools/infra/typeorm/schemas/Tool';

export default class ToolsRepository implements IToolsRepository {
  private ormRepository: MongoRepository<Tool>;

  constructor() {
    this.ormRepository = getMongoRepository(Tool);
  }

  async findAll({ user_id, tag }: IFindAllDTO): Promise<Tool[]> {
    const where = {
      user_id,
      tags: { $all: tag && [tag] },
    };

    if (!tag) {
      delete where.tags;
    }

    const tools = await this.ormRepository.find({
      where,
    });

    return tools;
  }

  async findOneById(id: string): Promise<Tool | undefined> {
    const tool = await this.ormRepository.findOne(id);
    return tool;
  }

  async create({
    description,
    link,
    tags,
    title,
    user_id,
  }: ICreateToolDTO): Promise<Tool> {
    const tool = this.ormRepository.create({
      title,
      description,
      link,
      tags,
      user_id,
    });

    await this.ormRepository.save(tool);

    return tool;
  }

  async delete(tool: Tool): Promise<void> {
    await this.ormRepository.delete(tool);
  }
}
