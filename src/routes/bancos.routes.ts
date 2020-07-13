import { Router } from 'express';
import { getCustomRepository, getRepository } from 'typeorm';

import AppError from '../errors/AppError';
import BancosRepository from '../repositories/BancosRepository';
import CreateBancoService from '../services/CreateBancoService';
import UpdateBancoService from '../services/UpdateBancoService';

import User from '../models/User';

const bancosRouter = Router();

bancosRouter.get('/:id', async (request, response) => {
  const bancosRepository = getCustomRepository(BancosRepository);
  const banco = await bancosRepository.findOne(request.params.id);

  return response.json(banco);
});

bancosRouter.get('/', async (request, response) => {
  const bancosRepository = getCustomRepository(BancosRepository);
  const bancos = await bancosRepository.find();

  return response.json(bancos);
});

bancosRouter.post('/', async (request, response) => {
  const { codigo, descricao, juros, prazo } = request.body;
  const { userId } = request.user;

  const userRepository = getRepository(User);
  const user = await userRepository.findOne(userId);

  const createBancoService = new CreateBancoService();
  const banco = await createBancoService.execute({
    codigo,
    descricao,
    juros,
    prazo,
    user,
  });

  return response.json({ banco });
});

bancosRouter.put('/:id', async (request, response) => {
  const {
    id = request.params.id,
    codigo,
    descricao,
    juros,
    prazo,
  } = request.body;

  const { userId } = request.user;

  const userRepository = getRepository(User);
  const user = await userRepository.findOne(userId);

  const updateBancoService = new UpdateBancoService();
  const banco = await updateBancoService.execute({
    id,
    codigo,
    descricao,
    juros,
    prazo,
    user,
  });

  return response.json({ banco });
});

bancosRouter.delete('/:id', async (request, response) => {
  const bancosRepository = getCustomRepository(BancosRepository);
  const banco = await bancosRepository.findOne(request.params.id);

  if (!banco) {
    throw new AppError('Não foi encontrato o Banco para Deletar!!');
  }

  const resposta = await bancosRepository.remove(banco);

  return response.json(resposta);
});

export default bancosRouter;
