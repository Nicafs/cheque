import { sign, verify } from 'jsonwebtoken';
import authConfig from '../config/auth';

import AppError from '../errors/AppError';

interface TokenPaylod {
  iat: number;
  exp: number;
  sub: string;
  name: string;
}

interface Request {
  authHeader: string | undefined;
}

interface Response {
  tokenRefresh: string;
}

class RefreshUserService {
  public async execute({ authHeader }: Request): Promise<Response> {
    if (!authHeader) {
      throw new AppError('Usuário não autenticado.', 401);
    }

    const [, token] = authHeader.split(' ');

    const { secret, expiresIn } = authConfig.jwt;

    try {
      const decoded = verify(token, secret);

      if (!decoded) {
        throw new AppError(
          'Erro no formato do token. Usuário não autenticado.',
          401,
        );
      }

      const { name, sub } = decoded as TokenPaylod;

      const tokenRefresh = sign({ name }, secret, {
        subject: sub,
        expiresIn,
      });

      return { tokenRefresh };
    } catch (err) {
      throw new AppError(
        'Erro no formato do token. Usuário não autenticado.',
        401,
      );
    }
  }
}

export default RefreshUserService;
