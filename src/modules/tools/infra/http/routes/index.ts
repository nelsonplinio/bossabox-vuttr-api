import { Router } from 'express';

import ToolsController from '../controllers/ToolsController';

const toolsRoutes = Router();
const toolsController = new ToolsController();

toolsRoutes.post('/', toolsController.create);
toolsRoutes.get('/', toolsController.index);
toolsRoutes.delete('/:tool_id', toolsController.delete);

export default toolsRoutes;
