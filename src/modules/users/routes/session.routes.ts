import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import SessionController from '@modules/users/controllers/SessionController';

const sessionRoutes = Router();
const sessionController = new SessionController();

sessionRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  sessionController.create,
);

export default sessionRoutes;
