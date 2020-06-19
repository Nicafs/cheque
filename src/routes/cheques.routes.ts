import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import AppError from '../errors/AppError';
import ChequesRepository from '../repositories/ChequesRepository';
import CreateChequeService from '../services/CreateChequeService';
import UpdateChequeService from '../services/UpdateChequeService';
// import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const chequesRouter = Router();

// chequesRouter.use(ensureAuthenticated);

chequesRouter.get('/:id', async (request, response) => {
  const chequesRepository = getCustomRepository(ChequesRepository);
  const cheque = await chequesRepository.findByIds([request.params.id]);

  return response.json(cheque);
});

chequesRouter.get('/', async (request, response) => {
  const chequesRepository = getCustomRepository(ChequesRepository);
  const cheques = await chequesRepository.find();

  return response.json(cheques);
});

chequesRouter.post('/', async (request, response) => {
  const {
    banco_id,
    client_id,
    agencia,
    conta,
    numero,
    situacao,
    dias,
    data_vencimento,
    data_quitacao,
    valor_operacao,
    valor_encargos,
    emitente
  } = request.body;

  const createChequeService = new CreateChequeService();

  const cheque = await createChequeService.execute({
    client_id,
    banco_id,
    agencia,
    conta,
    numero,
    situacao,
    dias,
    data_vencimento,
    data_quitacao,
    valor_operacao,
    valor_encargos,
    emitente
  });

  return response.json({ cheque });
});

chequesRouter.put('/', async (request, response) => {
  const { 
    id,
    client_id,
    banco_id,
    agencia,
    conta,
    numero,
    situacao,
    dias,
    data_vencimento,
    data_quitacao,
    valor_operacao,
    valor_encargos,
    emitente } = request.body;

  const updateChequeService = new UpdateChequeService();

  const cheque = await updateChequeService.execute({
    id,
    client_id,
    banco_id,
    agencia,
    conta,
    numero,
    situacao,
    dias,
    data_vencimento,
    data_quitacao,
    valor_operacao,
    valor_encargos,
    emitente
  });

  return response.json({ cheque });
});

chequesRouter.delete('/:id', async (request, response) => {
  const chequesRepository = getCustomRepository(ChequesRepository);
  const cheque = await chequesRepository.findOne(request.params.id);

  if(!cheque) {
    throw new AppError('Não foi encontrato o Banco para Deletar!!');
  }

  const resposta = await chequesRepository.remove(cheque);

  return response.json(resposta);
});

export default chequesRouter;
