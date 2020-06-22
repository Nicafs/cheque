import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import AppError from '../errors/AppError';
import ChequeOperacaoRepository from '../repositories/ChequeOperacaoRepository';
import OperacaoRepository from '../repositories/OperacaoRepository';
import UsersRepository from '../repositories/UsersRepository';

import CreateChequeOperacaoService from '../services/CreateChequeOperacaoService';
import UpdateChequeOperacaoService from '../services/UpdateChequeOperacaoService';
import User from '../models/User';
// import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const chequeOperacaoRouter = Router();

// chequeOperacaoRouter.use(ensureAuthenticated);

chequeOperacaoRouter.get('/:id', async (request, response) => {
  const chequeOperacaoRepository = getCustomRepository(ChequeOperacaoRepository);
  const chequeOperacao = await chequeOperacaoRepository.findByIds([request.params.id]);

  return response.json(chequeOperacao);
});

chequeOperacaoRouter.get('/', async (request, response) => {
  const chequeOperacaoRepository = getCustomRepository(ChequeOperacaoRepository);
  const chequeOperacao = await chequeOperacaoRepository.find();

  return response.json(chequeOperacao);
});

chequeOperacaoRouter.post('/', async (request, response) => {
  const {
    operacao_id,
    user_id,
    banco_id,
    tipo,
    agencia,
    conta,
    numero,
    dias,
    status,
    data_vencimento,
    data_quitacao,
    valor_operacao,
    valor_encargos,
    emitente,
  } = request.body;

  const operacaoRepository = getCustomRepository(OperacaoRepository);
  const operacao = await operacaoRepository.findOne(operacao_id);

  const usersRepository = getCustomRepository(UsersRepository);
  const user = await usersRepository.findOne(user_id);

  const createChequeOperacaoService = new CreateChequeOperacaoService();

  const chequeOperacao = await createChequeOperacaoService.execute({
    operacao,
    user,
    banco_id,
    tipo,
    agencia,
    conta,
    numero,
    dias,
    status,
    data_vencimento,
    data_quitacao,
    valor_operacao,
    valor_encargos,
    emitente,
  });

  return response.json({ chequeOperacao });
});

chequeOperacaoRouter.put('/:id', async (request, response) => {
  const { 
    id = request.params.id,
    banco_id,
    tipo,
    agencia,
    conta,
    numero,
    dias,
    status,
    data_vencimento,
    data_quitacao,
    valor_operacao,
    valor_encargos,
    emitente, } = request.body;

  const updateChequeOperacaoService = new UpdateChequeOperacaoService();

  const chequeOperacao = await updateChequeOperacaoService.execute({
    id,
    banco_id,
    tipo,
    agencia,
    conta,
    numero,
    dias,
    status,
    data_vencimento,
    data_quitacao,
    valor_operacao,
    valor_encargos,
    emitente,
  });

  return response.json({ chequeOperacao });
});

chequeOperacaoRouter.delete('/:id', async (request, response) => {
  const chequeOperacaoRepository = getCustomRepository(ChequeOperacaoRepository);
  const chequeOperacao = await chequeOperacaoRepository.findOne(request.params.id);

  if(!chequeOperacao) {
    throw new AppError('Não foi encontrato o Banco para Deletar!!');
  }

  const resposta = await chequeOperacaoRepository.remove(chequeOperacao);

  return response.json(resposta);
});

export default chequeOperacaoRouter;
