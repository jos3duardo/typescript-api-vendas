import Product from '@modules/products/typeorm/entities/Product';
import { getCustomRepository } from 'typeorm';
import ProductsRepository from '@modules/products/typeorm/repositories/ProductsRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
  id: string;
}

class ShowProductService {
  public async execute({ id }: IRequest): Promise<Product> {
    const productsRepository = getCustomRepository(ProductsRepository);
    const product = await productsRepository.findOne(id);
    if (!product) {
      throw new AppError('Product not found.');
    }
    return product;
  }
}

export default ShowProductService;
