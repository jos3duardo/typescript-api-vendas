import AppError from '@shared/errors/AppError';
import Product from '@modules/products/typeorm/entities/Product';
import { getCustomRepository } from 'typeorm';
import ProductsRepository from '@modules/products/typeorm/repositories/ProductsRepository';

interface IRequest {
  name: string;
  price: number;
  quantity: number;
}

class CreateProductService {
  public async execute({ name, price, quantity }: IRequest): Promise<Product> {
    const productsRepository = getCustomRepository(ProductsRepository);
    const productExists = await productsRepository.findByName(name);
    if (productExists) {
      throw new AppError('There is already one product with this name');
    }
    const product = productsRepository.create({
      name,
      price,
      quantity,
    });

    await productsRepository.save(product);
    return product;
  }
}

export default CreateProductService;
