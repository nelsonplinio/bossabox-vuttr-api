import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IToolsRepository from '../repositories/IToolsRepository';

interface IRequest {
  id: string;
  user_id: string;
}

@injectable()
export default class DeleteToolService {
  constructor(
    @inject('ToolsRepository')
    private toolsRepository: IToolsRepository,
  ) {}

  public async execute({ id, user_id }: IRequest): Promise<void> {
    const tool = await this.toolsRepository.findOneById(id);

    if (!tool) {
      throw new AppError('Tool not found', 404);
    }

    if (tool.user_id !== user_id) {
      throw new AppError("You don't can delete this tool, only owner.");
    }

    await this.toolsRepository.delete(tool);
  }
}
