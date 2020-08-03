import { Router } from 'express';
import { getRepository } from 'typeorm';

import Configuracao from '../models/Configuracao';

import AppError from '../errors/AppError';

const configuracaoRouter = Router();

configuracaoRouter.get('/', async (request, response) => {
  const configuracaoRepository = getRepository(Configuracao);

  const configuracao = await configuracaoRepository.findOne();
  
  if(configuracao) {
    delete configuracao.logo;
  }

  return response.json(configuracao);
});

configuracaoRouter.post('/', async (request, response) => {
  const {
    name,
    nomeFantasia,
    logo,
    cpfCnpj,
    email,
    celular,
    whatsapp,
    telefone,
    percentagem,
    endBairro,
    endCep,
    endCidade,
    endEstado,
    endComplemento,
    endTipoLogradouro,
    endLogradouro,
    endNumero,
    endReferencia,
  } = request.body;

  const configuracaoRepository = getRepository(Configuracao);
  const configuracao = await configuracaoRepository.create({
    name,
    nomeFantasia,
    logo,
    cpfCnpj,
    email,
    celular,
    whatsapp,
    telefone,
    percentagem,
    endBairro,
    endCep,
    endCidade,
    endEstado,
    endComplemento,
    endTipoLogradouro,
    endLogradouro,
    endNumero,
    endReferencia,
  });
  
  await configuracaoRepository.save(configuracao);

  return response.json({ configuracao });
});

configuracaoRouter.put('/', async (request, response) => {
  const {
    name,
    nomeFantasia,
    logo,
    cpfCnpj,
    email,
    celular,
    whatsapp,
    telefone,
    percentagem,
    endBairro,
    endCep,
    endCidade,
    endEstado,
    endComplemento,
    endTipoLogradouro,
    endLogradouro,
    endNumero,
    endReferencia,
  } = request.body;

  const configuracaoRepository = getRepository(Configuracao);
  const configuracaoPrev = await configuracaoRepository.findOne();

  if (!configuracaoPrev) {
    throw new AppError('Não foi encontrato a Configuração para Atualizar!!');
  }

  configuracaoPrev.name = name;
  configuracaoPrev.nomeFantasia = nomeFantasia;
  configuracaoPrev.logo = logo;
  configuracaoPrev.cpfCnpj = cpfCnpj;
  configuracaoPrev.email = email;
  configuracaoPrev.celular = celular;
  configuracaoPrev.whatsapp = whatsapp;
  configuracaoPrev.telefone = telefone;
  configuracaoPrev.percentagem = percentagem;
  configuracaoPrev.endBairro = endBairro;
  configuracaoPrev.endCep = endCep;
  configuracaoPrev.endCidade = endCidade;
  configuracaoPrev.endEstado = endEstado;
  configuracaoPrev.endComplemento = endComplemento;
  configuracaoPrev.endTipoLogradouro = endTipoLogradouro;
  configuracaoPrev.endLogradouro = endLogradouro;
  configuracaoPrev.endNumero = endNumero;
  configuracaoPrev.endReferencia = endReferencia;

  const conf = await configuracaoRepository.save(configuracaoPrev);

  return response.json({ conf });
});

export default configuracaoRouter;
