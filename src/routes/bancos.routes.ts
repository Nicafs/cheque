import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import BancosRepository from '../repositories/BancosRepository';
import CreateBancoService from '../services/CreateBancoService';
// import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const bancosRouter = Router();

// bancosRouter.use(ensureAuthenticated);

bancosRouter.get('/', async (request, response) => {
  const bancosRepository = getCustomRepository(BancosRepository);
  const bancos = await bancosRepository.find();

  return response.json(bancos);
});

bancosRouter.post('/', async (request, response) => {
  const { codigo, descricao, juros, prazo } = request.body;

  const createBancoService = new CreateBancoService();

  const banco = await createBancoService.execute({
    codigo,
    descricao,
    juros,
    prazo,
  });

  return response.json({ banco });
});

export default bancosRouter;
