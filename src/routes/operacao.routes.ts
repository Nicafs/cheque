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
  const operacao = await operacaoRepository.findOne(request.params.id, { relations: ["chequeOperacao"] });

  return response.json(operacao);
});

OperacaoRouter.get('/', async (request, response) => {
  const operacaoRepository = getCustomRepository(OperacaoRepository);
  const operacao = await operacaoRepository.find({ relations: ["chequeOperacao"] });

  return response.json(operacao);
});

OperacaoRouter.post('/', async (request, response) => {
  const {
    banco_id,
    client_id,
    chequeOperacao,
    user,
    situacao,
    percentual,
    tarifa,
    data_operacao,
    acrescimos,
    tarifa_bordero,
    total_operacao,
    total_encargos,
    total_liquido,
    total_outros,
    obs,
  } = request.body;

  const createOperacaoService = new CreateOperacaoService();

  const operacao = await createOperacaoService.execute({
    banco_id,
    client_id,
    chequeOperacao,
    user,
    situacao,
    percentual,
    tarifa,
    data_operacao,
    acrescimos,
    tarifa_bordero,
    total_operacao,
    total_encargos,
    total_liquido,
    total_outros,
    obs,
  });

  return response.json({ operacao });
});

OperacaoRouter.put('/:id', async (request, response) => {
  const { 
    id = request.params.id,
    banco_id,
    client_id,
    situacao,
    percentual,
    tarifa,
    data_operacao,
    acrescimos,
    tarifa_bordero,
    total_operacao,
    total_encargos,
    total_liquido,
    total_outros,
    obs, } = request.body;

  const updateOperacaoService = new UpdateOperacaoService();

  const operacao = await updateOperacaoService.execute({
    id,
    banco_id,
    client_id,
    situacao,
    percentual,
    tarifa,
    data_operacao,
    acrescimos,
    tarifa_bordero,
    total_operacao,
    total_encargos,
    total_liquido,
    total_outros,
    obs,
  });

  return response.json({ operacao });
});

OperacaoRouter.delete('/:id', async (request, response) => {
  const operacaoRepository = getCustomRepository(OperacaoRepository);
  const operacao = await operacaoRepository.findOne(request.params.id);

  if(!operacao) {
    throw new AppError('Não foi encontrato a Operação para Deletar!!');
  }

  const resposta = await operacaoRepository.remove(operacao);

  return response.json(resposta);
});

export default OperacaoRouter;
