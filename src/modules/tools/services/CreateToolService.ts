import { inject, injectable } from 'tsyringe';
import IToolsRepository from '../repositories/IToolsRepository';
import Tool from '../infra/typeorm/schemas/Tool';

interface IRequest {
  title: string;
  description: string;
  link: string;
  tags: string[];
  user_id: string;
}
@injectable()
export default class CreateToolService {
  constructor(
    @inject('ToolsRepository')
    private toolsRepository: IToolsRepository,
  ) {}

  public async execute({
    title,
    description,
    link,
    tags,
    user_id,
  }: IRequest): Promise<Tool> {
    const tool = await this.toolsRepository.create({
      title,
      description,
      link,
      tags,
      user_id,
    });

    return tool;
  }
}
