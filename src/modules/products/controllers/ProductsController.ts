import {Request, Response} from 'express'
import ListProductService from '@modules/products/services/ListProductService'
import ShowProductService from '@modules/products/services/ShowProductService'
import CreateProductService from '@modules/products/services/CreateProductService'
import UpdateProductService from '@modules/products/services/UpdateProductService'
import DeleteProductService from '@modules/products/services/DeleteProductService'

export default class ProductsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listProducts = new ListProductService()

    const product = await listProducts.execute()

    return response.json(product)
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const {id} = request.params

    const showProducts = new ShowProductService()

    const products = await showProducts.execute({id})

    return response.json(products)
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const {name, price, quantity} = request.body

    const createProducts = new CreateProductService()

    const products = await createProducts.execute({name, price, quantity})

    return response.json(products)
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const {id} = request.params
    const {name, price, quantity} = request.body

    const updateProducts = new UpdateProductService()

    const products = await updateProducts.execute({id, name, price, quantity})

    return response.json(products)
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const {id} = request.params

    const deleteProducts = new DeleteProductService()

    await deleteProducts.execute({id})

    return response.json([])
  }
}
