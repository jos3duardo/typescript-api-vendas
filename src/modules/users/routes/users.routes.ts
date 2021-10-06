import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import UserController from '@modules/users/controllers/UserController';
import isAutenticated from '@shared/http/middlewares/isAuthenticated';

const usersRoutes = Router();
const usersController = new UserController();

usersRoutes.get('/', isAutenticated, usersController.index);

usersRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  usersController.create,
);

export default usersRoutes;
