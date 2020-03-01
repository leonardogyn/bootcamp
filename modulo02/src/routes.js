/* eslint-disable */
import { Router } from 'express';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

import authMiddelware from './app/middlewares/auth';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

//Todas as rotas abaixo deste, deverão passar o token de autenticação
routes.use(authMiddelware);

routes.put('/users', UserController.update);

export default routes;
