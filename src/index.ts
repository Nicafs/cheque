// import 'reflect-metadata';

import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import routes from './routes';
import AppError from './errors/AppError';

import './database';

const path = require("path");
const cors = require('cors');

const app = express();
const porta = process.env.PORT_APP || 21130;

var http = require('http');

app.use(cors());
app.use(express.json());
app.use("/api", routes);

const baseDir = `${__dirname}/build/`

//Serve os outros arquivos, como CSSs, Javascripts, Imagens etc.
app.use(express.static('build')); 
app.use(express.static(`${baseDir}`))

// O wildcard '*' serve para servir o mesmo index.html independente do caminho especificado pelo navegador.
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, 'build', "index.html"));
});

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  // console.error(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen(porta, () => {
  console.log(`Escutando na porta: ${porta}!`);
});