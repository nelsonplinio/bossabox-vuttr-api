import { uuid } from 'uuidv4';
import IFindAllDTO from '@modules/tools/dtos/IFindAllDTO';
import ICreateToolDTO from '@modules/tools/dtos/ICreateToolDTO';
import Tool from '@modules/tools/infra/typeorm/schemas/Tool';
import IToolsRepository from '../IToolsRepository';

export default class FakeToolsRepository implements IToolsRepository {
  private tools: Tool[] = [];

  async findAll(data: IFindAllDTO): Promise<Tool[]> {
    const { tag } = data;
    const tools = this.tools.filter(tool => {
      if (!tag) {
        return true;
      }

      return tool.tags.includes(tag);
    });

    return tools;
  }

  async create(data: ICreateToolDTO): Promise<Tool> {
    const tool = new Tool();

    Object.assign(tool, { id: uuid() }, { ...data });

    this.tools.push(tool);

    return tool;
  }

  async delete({ id }: Tool): Promise<void> {
    const index = this.tools.findIndex(tool => tool.id === id);

    if (index === -1) {
      return;
    }

    this.tools.splice(1, index);
  }

  async findOneById(id: string): Promise<Tool | undefined> {
    const tool = this.tools.find(toolSaved => toolSaved.id === id);
    return tool;
  }
}
