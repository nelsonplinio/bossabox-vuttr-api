import { Inject } from 'tsyringe';
import IToolsRepository from '../repositories/IToolsRepository';
import Tool from '../infra/typeorm/schemas/Tool';

interface IRequest {
  title: string;
  description: string;
  link: string;
  tags: string[];
}

export default class CreateToolService {
  constructor(
    @Inject('ToolsRepository')
    private toolsRepository: IToolsRepository,
  ) {}

  public async execute({
    title,
    description,
    link,
    tags,
  }: IRequest): Promise<Tool> {
    const tool = await this.toolsRepository.create({
      title,
      description,
      link,
      tags,
    });

    return tool;
  }
}
