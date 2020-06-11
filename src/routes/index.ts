import { Router } from 'express';

import clientsRouter from './clients.routes';
import bancosRouter from './bancos.routes';
import chequesRouter from './cheques.routes';
import usersRouter from './users.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/clients', clientsRouter);
routes.use('/bancos', bancosRouter);
routes.use('/cheques', chequesRouter);

export default routes;
