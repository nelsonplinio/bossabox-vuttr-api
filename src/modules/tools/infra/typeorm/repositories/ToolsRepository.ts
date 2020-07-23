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

  async findAll(filter: IFindAllDTO): Promise<Tool[]> {
    if (!filter) {
      const tools = await this.ormRepository.find();
      return tools;
    }

    const { tag } = filter;

    const tools = await this.ormRepository.find({
      where: {
        tags: { $all: [tag] },
      },
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

  async delete(tool: Tool): Promise<void> {
    await this.ormRepository.delete(tool);
  }
}
