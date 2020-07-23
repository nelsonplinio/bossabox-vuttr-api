import { inject, injectable } from 'tsyringe';
import IToolsRepository from '../repositories/IToolsRepository';

interface IRequest {
  id: string;
}

@injectable()
export default class DeleteToolService {
  constructor(
    @inject('ToolsRepository')
    private toolsRepository: IToolsRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<void> {
    await this.toolsRepository.deleteById(id);
  }
}
