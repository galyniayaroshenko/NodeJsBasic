import { ProductEntity, product } from '../models/product.model';

const products: ProductEntity[] = [product];

export class ProductService {
  getAllProducts(): ProductEntity[] {
    return products;
  }

  getProductById(id: string): ProductEntity | undefined {
    return products.find((product) => product.id === id);
  }
}
