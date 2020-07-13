import { Router } from 'express';
import { getCustomRepository, getRepository } from 'typeorm';

import AppError from '../errors/AppError';

import Operacao from '../models/Operacao';

import OperacaoRepository from '../repositories/OperacaoRepository';

import CreateOperacaoService from '../services/CreateOperacaoService';
import UpdateOperacaoService from '../services/UpdateOperacaoService';

import ChequeOperacao from '../models/ChequeOperacao';

const OperacaoRouter = Router();

OperacaoRouter.get('/:id', async (request, response) => {
  const operacaoRepository = getRepository(Operacao);

  const operacao = await operacaoRepository.find({
    where: { id: request.params.id },
    relations: ['chequeOperacao'],
    join: {
      alias: 'operacao',
      leftJoinAndSelect: {
        id: 'operacao.client',
      },
    },
  });

  // const operacao = await operacaoRepository.findOne(id, { relations: ['chequeOperacao'] });

  return response.json(operacao[0]);
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
  const { userId } = request.user;

  const createOperacaoService = new CreateOperacaoService();

  const operacao = await createOperacaoService.execute({
    client_id,
    userId,
    chequeOperacao,
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
    chequeOperacao,
    client,
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
  const { userId } = request.user;

  const updateOperacaoService = new UpdateOperacaoService();

  const operacao = await updateOperacaoService.execute({
    id,
    chequeOperacao,
    client,
    userId,
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
  const id = parseInt(request.params.id);
  const operacaoRepository = getCustomRepository(OperacaoRepository);
  const operacao = await operacaoRepository.findOne(id);

  if (!operacao) {
    throw new AppError('Não foi encontrato a Operação para Deletar!!');
  }

  const chequeOperacaoRepository = getRepository(ChequeOperacao);
  await chequeOperacaoRepository.delete({ operacao });

  const removed = await operacaoRepository.remove(operacao);

  if (!removed) {
    throw new AppError('Houve em erro inesperado!!');
  }

  return response.json({ msg: 'Foi excluido com Sucesso!' });
});

export default OperacaoRouter;
