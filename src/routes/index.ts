import { Router } from 'express';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import sessionsRouter from './sessions.routes';
import clientsRouter from './clients.routes';
import enderecoClientRouter from './enderecoClient.routes';
import telefoneClientRouter from './telefoneClient.routes';
import emailClientRouter from './emailClient.routes';
import bancoClientRouter from './bancoClient.routes';
import referenciaClientRouter from './referenciaClient.routes';
import bancosRouter from './bancos.routes';
import chequesRouter from './cheques.routes';
import usersRouter from './users.routes';
import chequeOperacaoRouter from './chequeOperacao.routes';
import historicoOperacoesRouter from './historicoOperacoes.routes';
import chequeOperacaoQuitacaoRouter from './chequeOperacaoQuitacao.routes';
import operacaoRouter from './operacao.routes';
import configuracaoRouter from './configuracao.routes';

const routes = Router();
routes.use('/sessions', sessionsRouter);

routes.use(ensureAuthenticated);

routes.use('/users', usersRouter);
routes.use('/clients', clientsRouter);
routes.use('/enderecoClient', enderecoClientRouter);
routes.use('/telefoneClient', telefoneClientRouter);
routes.use('/emailClient', emailClientRouter);
routes.use('/bancoClient', bancoClientRouter);
routes.use('/referenciaClient', referenciaClientRouter);
routes.use('/bancos', bancosRouter);
routes.use('/cheques', chequesRouter);
routes.use('/chequeOperacao', chequeOperacaoRouter);
routes.use('/chequeOperacao/quitacao', chequeOperacaoQuitacaoRouter);
routes.use('/historicoOperacoes', historicoOperacoesRouter);
routes.use('/operacoes', operacaoRouter);
routes.use('/configuracao', configuracaoRouter);

export default routes;

module.exports = routes;
