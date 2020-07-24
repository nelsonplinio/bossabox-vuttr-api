import { inject, injectable } from 'tsyringe';
import Tool from '../infra/typeorm/schemas/Tool';
import IToolsRepository from '../repositories/IToolsRepository';

interface IRequest {
  tag?: string;
  user_id: string;
}

@injectable()
export default class ListToolsService {
  constructor(
    @inject('ToolsRepository')
    private toolsRepository: IToolsRepository,
  ) {}

  public async execute({ user_id, tag }: IRequest): Promise<Tool[]> {
    const tools = this.toolsRepository.findAll({ user_id, tag });

    return tools;
  }
}
