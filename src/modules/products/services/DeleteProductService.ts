import {getCustomRepository} from 'typeorm'
import ProductsRepository from '@modules/products/typeorm/repositories/ProductsRepository'
import Product from '@modules/products/typeorm/entities/Product'
import AppError from '@shared/errors/AppError'

interface IRequest {
  id: string
}

class DeleteProductService {
  public async execute({id}: IRequest): Promise<void> {
    const productsRepository = getCustomRepository(ProductsRepository)
    const product = await productsRepository.findOne(id)

    if (!product) {
      throw new AppError('Product not found')
    }

    await productsRepository.remove(product)
  }
}

export default DeleteProductService
