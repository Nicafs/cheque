import { Router } from 'express';

import clientsRouter from './clients.routes';
import enderecoClientRouter from './enderecoClient.routes';
import bancosRouter from './bancos.routes';
import chequesRouter from './cheques.routes';
import usersRouter from './users.routes';
import chequeOperacaoRouter from './chequeOperacao.routes';
import operacaoRouter from './operacao.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/clients', clientsRouter);
routes.use('/enderecoClient', enderecoClientRouter);
routes.use('/bancos', bancosRouter);
routes.use('/cheques', chequesRouter);
routes.use('/chequeOpercao', chequeOperacaoRouter);
routes.use('/operacoes', operacaoRouter);

export default routes;
