import { Router } from 'express';
import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';

import ChequeOperacao from '../models/ChequeOperacao';

// import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const chequeOperacaoQuitacaoRouter = Router();

// chequeOperacaoRouter.use(ensureAuthenticated);

chequeOperacaoQuitacaoRouter.put('/:id', async (request, response) => {
  const id = parseInt(request.params.id);
  const chequeOperacaoRepository = getRepository(ChequeOperacao);
  const chequeOperacao = await chequeOperacaoRepository.findOne(id);

  if (!chequeOperacao) {
    throw new AppError('Não foi encontrato o Cheque para Quitar!!');
  }

  chequeOperacao.data_quitacao = new Date();

  const updatedChequeOperacao =  await chequeOperacaoRepository.save(chequeOperacao);

  return response.json(updatedChequeOperacao);
});

export default chequeOperacaoQuitacaoRouter;
