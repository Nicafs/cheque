import { Router } from 'express';
import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';

import ChequeOperacao from '../models/ChequeOperacao';

const chequeOperacaoQuitacaoRouter = Router();

chequeOperacaoQuitacaoRouter.put('/:id', async (request, response) => {
  const id = parseInt(request.params.id, 10);
  const chequeOperacaoRepository = getRepository(ChequeOperacao);
  const chequeOperacao = await chequeOperacaoRepository.findOne(id);

  if (!chequeOperacao) {
    throw new AppError('Não foi encontrato o Cheque para Quitar!!');
  }

  chequeOperacao.data_quitacao = new Date();

  const updatedChequeOperacao = await chequeOperacaoRepository.save(
    chequeOperacao,
  );

  return response.json(updatedChequeOperacao);
});

export default chequeOperacaoQuitacaoRouter;
