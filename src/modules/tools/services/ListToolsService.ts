import { inject, injectable } from 'tsyringe';
import IToolsRepository from '../repositories/IToolsRepository';
import Tool from '../infra/typeorm/schemas/Tool';

interface IRequest {
  tag?: string;
}

@injectable()
export default class ListToolsService {
  constructor(
    @inject('ToolsRepository')
    private toolsRepository: IToolsRepository,
  ) {}

  public async execute({ tag }: IRequest): Promise<Tool[]> {
    const tools = this.toolsRepository.findAll({ tag });
    return tools;
  }
}
