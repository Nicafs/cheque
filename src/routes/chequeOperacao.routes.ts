import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import AppError from '../errors/AppError';
import ChequeOperacaoRepository from '../repositories/ChequeOperacaoRepository';
import CreateChequeOperacaoService from '../services/CreateChequeOperacaoService';
import UpdateChequeOperacaoService from '../services/UpdateChequeOperacaoService';
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
    banco_id,
    agencia,
    conta,
    numero,
    situacao,
    dias,
    data_vencimento,
    data_quitacao,
    valor_operacao,
    valor_encargos,
    emitente
  } = request.body;

  const createChequeOperacaoService = new CreateChequeOperacaoService();

  const chequeOperacao = await createChequeOperacaoService.execute({
    operacao_id,
    banco_id,
    agencia,
    conta,
    numero,
    situacao,
    dias,
    data_vencimento,
    data_quitacao,
    valor_operacao,
    valor_encargos,
    emitente
  });

  return response.json({ chequeOperacao });
});

chequeOperacaoRouter.put('/', async (request, response) => {
  const { 
    id,
    operacao_id,
    banco_id,
    agencia,
    conta,
    numero,
    situacao,
    dias,
    data_vencimento,
    data_quitacao,
    valor_operacao,
    valor_encargos,
    emitente } = request.body;

  const updateChequeOperacaoService = new UpdateChequeOperacaoService();

  const chequeOperacao = await updateChequeOperacaoService.execute({
    id,
    operacao_id,
    banco_id,
    agencia,
    conta,
    numero,
    situacao,
    dias,
    data_vencimento,
    data_quitacao,
    valor_operacao,
    valor_encargos,
    emitente
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
