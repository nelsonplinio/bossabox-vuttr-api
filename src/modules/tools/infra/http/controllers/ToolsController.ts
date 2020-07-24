import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateToolService from '@modules/tools/services/CreateToolService';
import ListToolsService from '@modules/tools/services/ListToolsService';
import DeleteToolService from '@modules/tools/services/DeleteToolService';

export default class ToolsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user;
    const { title, description, link, tags } = request.body;

    const createTool = container.resolve(CreateToolService);

    const tool = await createTool.execute({
      title,
      description,
      link,
      tags,
      user_id,
    });

    return response.status(201).json(tool);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const tag = request.query.tag as string;
    const { id: user_id } = request.user;

    const listTools = container.resolve(ListToolsService);

    const tools = await listTools.execute({ tag, user_id });

    return response.json(tools);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user;
    const { tool_id } = request.params;

    const deleteTool = container.resolve(DeleteToolService);

    await deleteTool.execute({
      id: tool_id,
      user_id,
    });

    return response.status(204).send();
  }
}
