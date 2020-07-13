import { Router } from 'express';
import { getCustomRepository, getRepository } from 'typeorm';

import AppError from '../errors/AppError';
import ChequeOperacaoRepository from '../repositories/ChequeOperacaoRepository';
import OperacaoRepository from '../repositories/OperacaoRepository';

import CreateChequeOperacaoService from '../services/CreateChequeOperacaoService';
import UpdateChequeOperacaoService from '../services/UpdateChequeOperacaoService';

import User from '../models/User';
import Banco from '../models/Banco';

const chequeOperacaoRouter = Router();

chequeOperacaoRouter.get('/:id', async (request, response) => {
  const chequeOperacaoRepository = getCustomRepository(
    ChequeOperacaoRepository,
  );
  const chequeOperacao = await chequeOperacaoRepository.findByIds([
    request.params.id,
  ]);

  return response.json(chequeOperacao);
});

chequeOperacaoRouter.get('/', async (request, response) => {
  const chequeOperacaoRepository = getCustomRepository(
    ChequeOperacaoRepository,
  );
  const chequeOperacao = await chequeOperacaoRepository.find();

  return response.json(chequeOperacao);
});

chequeOperacaoRouter.post('/', async (request, response) => {
  const {
    operacao_id,
    client,
    banco,
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
  const { userId } = request.user;

  const operacaoRepository = getCustomRepository(OperacaoRepository);
  const operacao = await operacaoRepository.findOne(operacao_id);

  const usersRepository = getRepository(User);
  const user = await usersRepository.findOne(userId);

  const bancoRepository = getRepository(Banco);
  const bancoData = await bancoRepository.findOne(banco.id);

  const createChequeOperacaoService = new CreateChequeOperacaoService();

  const chequeOperacao = await createChequeOperacaoService.execute({
    operacao,
    user,
    client,
    banco: bancoData,
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
    banco,
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
  const { userId } = request.user;

  const updateChequeOperacaoService = new UpdateChequeOperacaoService();

  const chequeOperacao = await updateChequeOperacaoService.execute({
    id,
    banco,
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
    userId,
  });

  return response.json({ chequeOperacao });
});

chequeOperacaoRouter.delete('/:id', async (request, response) => {
  const chequeOperacaoRepository = getCustomRepository(
    ChequeOperacaoRepository,
  );
  const chequeOperacao = await chequeOperacaoRepository.findOne(
    request.params.id,
  );

  if (!chequeOperacao) {
    throw new AppError('Não foi encontrato o Cheque para Deletar!!');
  }

  const resposta = await chequeOperacaoRepository.remove(chequeOperacao);

  return response.json(resposta);
});

export default chequeOperacaoRouter;
