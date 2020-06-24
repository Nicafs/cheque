import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import AppError from '../errors/AppError';
// import EnderecoClientRepository from '../repositories/EnderecoClientRepository';
import CreateEnderecoClientService from '../services/CreateEnderecoClientService';
// import UpdateEnderecoClientService from '../services/UpdateEnderecoClientService';
// import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const enderecoClientRouter = Router();

// enderecoClientRouter.use(ensureAuthenticated);

// enderecoClientRouter.get('/:id', async (request, response) => {
//   const chequesRepository = getCustomRepository(ChequesRepository);
//   const cheque = await chequesRepository.findByIds([request.params.id]);

//   return response.json(cheque);
// });

// enderecoClientRouter.get('/', async (request, response) => {
//   const chequesRepository = getCustomRepository(ChequesRepository);
//   const cheques = await chequesRepository.find();

//   return response.json(cheques);
// });

enderecoClientRouter.post('/', async (request, response) => {
  const {
    tipo,
    bairro,
    cep,
    cidade,
    estado,
    complemento,
    tipo_logradouro,
    logradouro,
    numero,
    referencia,
    user_id,
    client_id
  } = request.body;

  const createChequeService = new CreateEnderecoClientService();

  const user = undefined;
  const client = undefined;

  const enderecoClient = await createChequeService.execute({
    tipo,
    bairro,
    cep,
    cidade,
    estado,
    complemento,
    tipo_logradouro,
    logradouro,
    numero,
    referencia,
    user_id,
    client_id,
    user,
    client,
  });

  return response.json({ enderecoClient });
});

// enderecoClientRouter.put('/', async (request, response) => {
//   const { 
//     id,
//     client_id,
//     banco_id,
//     agencia,
//     conta,
//     numero,
//     situacao,
//     dias,
//     data_vencimento,
//     data_quitacao,
//     valor_operacao,
//     valor_encargos,
//     emitente } = request.body;

//   const updateChequeService = new UpdateChequeService();

//   const cheque = await updateChequeService.execute({
//     id,
//     client_id,
//     banco_id,
//     agencia,
//     conta,
//     numero,
//     situacao,
//     dias,
//     data_vencimento,
//     data_quitacao,
//     valor_operacao,
//     valor_encargos,
//     emitente
//   });

//   return response.json({ cheque });
// });

// enderecoClientRouter.delete('/:id', async (request, response) => {
//   const chequesRepository = getCustomRepository(ChequesRepository);
//   const cheque = await chequesRepository.findOne(request.params.id);

//   if(!cheque) {
//     throw new AppError('Não foi encontrato o Banco para Deletar!!');
//   }

//   const resposta = await chequesRepository.remove(cheque);

//   return response.json(resposta);
// });

export default enderecoClientRouter;
