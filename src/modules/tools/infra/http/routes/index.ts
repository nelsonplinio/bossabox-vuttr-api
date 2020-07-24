import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ToolsController from '../controllers/ToolsController';

const toolsRoutes = Router();
const toolsController = new ToolsController();

toolsRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      title: Joi.string().required(),
      description: Joi.string().required(),
      link: Joi.string().required(),
      tags: Joi.array().required(),
    },
  }),
  toolsController.create,
);

toolsRoutes.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      tag: Joi.string(),
    },
  }),
  toolsController.index,
);

toolsRoutes.delete(
  '/:tool_id',
  celebrate({
    [Segments.PARAMS]: {
      tool_id: Joi.string().required(),
    },
  }),
  toolsController.delete,
);

export default toolsRoutes;
