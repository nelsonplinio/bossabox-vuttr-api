import { Router } from 'express';

import toolsRoutes from '@modules/tools/infra/http/routes/tools.routes';
import usersRoutes from '@modules/users/infra/http/routes/users.routes';
import sessionsRoutes from '@modules/users/infra/http/routes/sessions.routes';

const routes = Router();

routes.use('/sessions', sessionsRoutes);

routes.use('/users', usersRoutes);

routes.use('/tools', toolsRoutes);

export default routes;
