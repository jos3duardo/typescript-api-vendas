import { Router } from 'express';
import productsRoutes from '@modules/products/routes/products.routes';
import usersRoutes from '@modules/users/routes/users.routes';
import sessionRoutes from '@modules/users/routes/session.routes';

const routes = Router();

routes.use('/sessions', sessionRoutes);

routes.use('/products', productsRoutes);
routes.use('/users', usersRoutes);

routes.get('/', (request, response) => {
  return response.json({ message: 'api online!' });
});

export default routes;
