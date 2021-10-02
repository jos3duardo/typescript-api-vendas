import {EntityRepository, In, Repository} from 'typeorm'
import Product from '../entities/Product'

@EntityRepository(Product)
class ProductsRepository extends Repository<Product> {
  public async findByName(name: string): Promise<Product | undefined> {
    return await this.findOne({
      where: {
        name,
      },
    })
  }
}

export default ProductsRepository
