import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import ChequesRepository from '../repositories/ChequesRepository';
import CreateChequeService from '../services/CreateChequeService';
// import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const chequesRouter = Router();

// chequesRouter.use(ensureAuthenticated);

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
    u3,
    situacao,
    emissao,
    prevDeposito,
    deposito,
    envio,
    devolucao,
    pagamento,
    valor,
    fornecedor_id,
    emitente,
    emitenteTipo,
    documento,
    phone,
  } = request.body;

  const createChequeService = new CreateChequeService();

  const cheque = await createChequeService.execute({
    banco_id,
    client_id,
    agencia,
    conta,
    numero,
    u3,
    situacao,
    emissao,
    prevDeposito,
    deposito,
    envio,
    devolucao,
    pagamento,
    valor,
    fornecedor_id,
    emitente,
    emitenteTipo,
    documento,
    phone,
  });

  return response.json({ cheque });
});

export default chequesRouter;
