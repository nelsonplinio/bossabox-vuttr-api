import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
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
    const tool = await this.toolsRepository.findOneById(id);

    if (!tool) {
      throw new AppError('Tool not found', 404);
    }

    await this.toolsRepository.delete(tool);
  }
}
