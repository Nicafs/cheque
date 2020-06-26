import { Router } from 'express';
import { getCustomRepository, getRepository } from 'typeorm';

import AppError from '../errors/AppError';

import Operacao from '../models/Operacao';

import OperacaoRepository from '../repositories/OperacaoRepository';

import CreateOperacaoService from '../services/CreateOperacaoService';
import UpdateOperacaoService from '../services/UpdateOperacaoService';
// import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const OperacaoRouter = Router();

// OperacaoRouter.use(ensureAuthenticated);

OperacaoRouter.get('/:id', async (request, response) => {
  const operacaoRepository = getRepository(Operacao);
  const operacao = await operacaoRepository.findOne(request.params.id);
  // const teste = await operacaoRepository
  //   .createQueryBuilder('operacao')
  //   .innerJoinAndSelect(
  //     'operacao.client',
  //     'clients',
  //     'clients.id = :client_id',
  //     { client_id: 'client_id' },
  //   )
  //   .getMany();
  // console.log('teste:', teste);
  console.log('operacao:', operacao);

  return response.json(operacao);
});

OperacaoRouter.get('/', async (request, response) => {
  const operacaoRepository = getRepository(Operacao);
  const operacao = await operacaoRepository.find({
    relations: ['chequeOperacao'],
  });

  return response.json(operacao);
});

OperacaoRouter.post('/', async (request, response) => {
  const {
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

  console.log('Entrou no Create - body:', request.body);
  const operacao = await createOperacaoService.execute({
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
  } = request.body;

  const updateOperacaoService = new UpdateOperacaoService();

  const operacao = await updateOperacaoService.execute({
    id,
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

  if (!operacao) {
    throw new AppError('Não foi encontrato a Operação para Deletar!!');
  }

  const resposta = await operacaoRepository.remove(operacao);

  return response.json(resposta);
});

export default OperacaoRouter;
