import { Router } from 'express';
import { getCustomRepository, getRepository } from 'typeorm';

import AppError from '../errors/AppError';

import Operacao from '../models/Operacao';
import Client from '../models/Client';

import OperacaoRepository from '../repositories/OperacaoRepository';

import CreateChequeOperacaoService from '../services/CreateChequeOperacaoService';
import UpdateChequeOperacaoService from '../services/UpdateChequeOperacaoService';

import CreateOperacaoService from '../services/CreateOperacaoService';
import UpdateOperacaoService from '../services/UpdateOperacaoService';

import ChequeOperacao from '../models/ChequeOperacao';

const OperacaoRouter = Router();

OperacaoRouter.get('/lastId', async (request, response) => {
  const operacaoRepository = getRepository(Operacao);
  const operacao = await operacaoRepository
    .createQueryBuilder('operacoes')
    .orderBy('id', 'DESC')
    .getOne();

  return response.json(operacao);
});

OperacaoRouter.get('/disponivel/:id', async (request, response) => {
  const id = parseInt(request.params.id);

  const clientRepository = getRepository(Client);
  const operacao = await clientRepository
    .createQueryBuilder('clients')
    .leftJoin('clients.operacao', 'operacao')
    .leftJoin('operacao.chequeOperacao', 'cheque', "cheque.status != 'QUITADO'")
    .select('clients.*')
    .addSelect('clients.limit - SUM(COALESCE(cheque.valor_operacao, 0))', 'disponivel')
    .addSelect('SUM(COALESCE(cheque.valor_operacao, 0))', 'total_operacao')
    .where({ id })
    .groupBy('clients.id')
    .getRawOne();

  return response.json(operacao);
});

OperacaoRouter.get('/:id', async (request, response) => {
  const operacaoRepository = getRepository(Operacao);

  const operacao = await operacaoRepository.findOne({
    where: { id: request.params.id },
    relations: ['chequeOperacao'],
  });

  if (!operacao) {
    throw new AppError('Não foi encontrato a Operação!!');
  }

  const clientRepository = getRepository(Client);
  const client = await clientRepository
    .createQueryBuilder('clients')
    .leftJoin('clients.operacao', 'operacao1')
    .leftJoin(
      'operacao1.chequeOperacao',
      'cheque',
      "cheque.status != 'QUITADO'",
    )
    .select('clients.*')
    .addSelect('clients.limit - SUM(COALESCE(cheque.valor_operacao, 0))', 'disponivel')
    .addSelect('SUM(COALESCE(cheque.valor_operacao, 0))', 'total_operacao')
    .where('clients.id = :id', { id: operacao.client_id })
    .groupBy('clients.id')
    .getRawOne();

  operacao.client = client;
  // const operacao = await operacaoRepository.findOne(id, { relations: ['chequeOperacao'] });

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
    situacao,
    percentual,
    tarifa,
    data_operacao,
    acrescimos,
    tarifa_bordero,
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
    obs,
  } = request.body;
  const { userId } = request.user;

  const updateOperacaoService = new UpdateOperacaoService();

  async function operacoes() {
    return await updateOperacaoService.execute({
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
      obs,
    });
  }
  
  const operacao = operacoes().then(async operacao => {
    const cheque = await chequeOperacao.map(async (co: ChequeOperacao) => {
      co.operacao = operacao;
  
      if (operacao.client) {
        co.client = operacao.client;
      }
      if (operacao.user) {
        co.user = operacao.user;
      }
      
      let cheque;
      if (co.id) {
        const chequeOperacaoService = new UpdateChequeOperacaoService();
        cheque = await chequeOperacaoService.execute(co);
      } else {
        const chequeOperacaoService = new CreateChequeOperacaoService();
        cheque = await chequeOperacaoService.execute(co);
      }
  
      return cheque;
    });

    return operacao.chequeOperacao = cheque;
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
