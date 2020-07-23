import { inject, injectable } from 'tsyringe';
import IToolsRepository from '../repositories/IToolsRepository';
import Tool from '../infra/typeorm/schemas/Tool';
import IFindAllDTO from '../dtos/IFindAllDTO';

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
    let filter: IFindAllDTO | undefined;

    if (tag) {
      filter = { tag };
    }

    const tools = this.toolsRepository.findAll(filter);

    return tools;
  }
}
