import { Router } from 'express';

import clientsRouter from './clients.routes';
import usersRouter from './users.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/clients', clientsRouter);

export default routes;
