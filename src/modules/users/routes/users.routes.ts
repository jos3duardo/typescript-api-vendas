import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import UserController from '@modules/users/controllers/UserController';
import isAutenticated from '@shared/http/middlewares/isAuthenticated';
import multer from 'multer';
import uploadConfig from '@config/upload';
import UserAvatarController from '@modules/users/controllers/UserAvatarController';

const usersRoutes = Router();
const usersController = new UserController();
const usersAvatarController = new UserAvatarController();

const upload = multer(uploadConfig);

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

usersRoutes.patch(
  'avatar',
  isAutenticated,
  upload.single('avatar'),
  usersAvatarController.update,
);

export default usersRoutes;
