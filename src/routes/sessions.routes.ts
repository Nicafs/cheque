import { Router } from 'express';

import AuthenticateUserService from '../services/AuthenticateUserService';
import RefreshUserService from '../services/RefreshUserService';

const sessionsRouter = Router();

sessionsRouter.post('/refresh', async (request, response) => {
  // Validação do Token JWT
  const authHeader = request.headers.authorization;

  const refreshUser = new RefreshUserService();
  const { tokenRefresh } = await refreshUser.execute({
    authHeader,
  });

  return response.json({ tokenRefresh });
});

sessionsRouter.post('/', async (request, response) => {
  const { username, password } = request.body;

  const authenticateUser = new AuthenticateUserService();

  const { user, token } = await authenticateUser.execute({
    username,
    password,
  });

  delete user.password;

  return response.json({ user, token });
});

export default sessionsRouter;
