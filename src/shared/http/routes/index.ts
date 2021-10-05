import { Router } from 'express';
import productsRoutes from '@modules/products/routes/products.routes';

const routes = Router();

routes.use('/products', productsRoutes);

routes.get('/', (request, response) => {
  return response.json({ message: 'api online!' });
});

export default routes;
