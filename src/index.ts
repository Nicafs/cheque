import 'reflect-metadata';

import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import routes from './routes';
import AppError from './errors/AppError';

import './database';

const cors = require('cors');

const app = express();

const porta = process.env.PORT_APP || 21574;

var http = require('http');

app.use(cors());
app.use(express.json());
app.use(routes);

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

const baseDir = `${__dirname}/build/`;
app.use(express.static(`${baseDir}`));
app.get('/', (req, res) => res.sendfile('index.html', { root: baseDir }));

app.listen(porta);
