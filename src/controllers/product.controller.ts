import { Request, Response } from 'express';
import { ProductService } from '../services/product.service';

const productService = new ProductService();

export const getAllProducts = (req: Request, res: Response): void => {
  const products = productService.getAllProducts();
  res.json(products);
};

export const getProductById = (req: Request, res: Response): void => {
  const productId = req.params.productId;
  const product = productService.getProductById(productId);
  if (!product) {
    res.status(404).json({ message: 'Product not found' });
  } else {
    res.json(product);
  }
};
