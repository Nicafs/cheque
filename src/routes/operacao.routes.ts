import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import AppError from '../errors/AppError';
import OperacaoRepository from '../repositories/OperacaoRepository';
import CreateOperacaoService from '../services/CreateOperacaoService';
import UpdateOperacaoService from '../services/UpdateOperacaoService';
// import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const OperacaoRouter = Router();

// OperacaoRouter.use(ensureAuthenticated);

OperacaoRouter.get('/:id', async (request, response) => {
  const operacaoRepository = getCustomRepository(OperacaoRepository);
  const operacao = await operacaoRepository.findByIds([request.params.id]);

  return response.json(operacao);
});

OperacaoRouter.get('/', async (request, response) => {
  const operacaoRepository = getCustomRepository(OperacaoRepository);
  const operacao = await operacaoRepository.find();

  return response.json(operacao);
});

OperacaoRouter.post('/', async (request, response) => {
  const {
    client_id,
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

  const createOperacaoService = new CreateOperacaoService();

  const operacao = await createOperacaoService.execute({
    client_id,
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

  return response.json({ operacao });
});

OperacaoRouter.put('/', async (request, response) => {
  const { 
    id,
    client_id,
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

  const updateOperacaoService = new UpdateOperacaoService();

  const operacao = await updateOperacaoService.execute({
    id,
    client_id,
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

  return response.json({ operacao });
});

OperacaoRouter.delete('/:id', async (request, response) => {
  const operacaoRepository = getCustomRepository(OperacaoRepository);
  const operacao = await operacaoRepository.findOne(request.params.id);

  if(!operacao) {
    throw new AppError('Não foi encontrato o Banco para Deletar!!');
  }

  const resposta = await operacaoRepository.remove(operacao);

  return response.json(resposta);
});

export default OperacaoRouter;
