import { Router } from 'express';
import { getRepository } from 'typeorm';

import Operacao from '../models/Operacao';

const historicoOperacoesRouter = Router();

historicoOperacoesRouter.get('/:id', async (request, response) => {
  const historicoOperacoesRepository = getRepository(Operacao);
  const historicoOperacoes = await historicoOperacoesRepository.findOne(
    request.params.id,
  );

  return response.json(historicoOperacoes);
});

historicoOperacoesRouter.get('/', async (request, response) => {
  const historicoOperacoesRepository = getRepository(Operacao);

  const historicoOperacoes = await historicoOperacoesRepository.find({
    join: {
      alias: 'operacao',
      leftJoinAndSelect: {
        client: 'operacao.client',
        user: 'operacao.user',
      },
    },
  });

  return response.json(historicoOperacoes);
});

export default historicoOperacoesRouter;
