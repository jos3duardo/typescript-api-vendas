import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import SessionController from '@modules/users/controllers/SessionController';
import ForgotPasswordController from '@modules/users/controllers/ForgotPasswordController';

const passwordRouter = Router();
const forgotController = new ForgotPasswordController();

passwordRouter.post(
  '/forgot',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
    },
  }),
  forgotController.create,
);

export default passwordRouter;
