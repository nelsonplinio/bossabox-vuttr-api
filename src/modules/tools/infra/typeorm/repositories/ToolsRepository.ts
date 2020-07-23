import { injectable } from 'tsyringe';
import { MongoRepository, getMongoRepository } from 'typeorm';

import IToolsRepository from '@modules/tools/repositories/IToolsRepository';
import ICreateToolDTO from '@modules/tools/dtos/ICreateToolDTO';
import Tool from '@modules/tools/infra/typeorm/schemas/Tool';

@injectable()
export default class ToolsRepository implements IToolsRepository {
  private ormRepository: MongoRepository<Tool>;

  constructor() {
    this.ormRepository = getMongoRepository(Tool);
  }

  async findAll(): Promise<Tool[]> {
    const tools = await this.ormRepository.find();
    return tools;
  }

  async findAllByTag(tag: string): Promise<Tool[]> {
    console.log(tag);
    return [];
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
    await this.ormRepository.findOneAndDelete({ id });
  }
}
