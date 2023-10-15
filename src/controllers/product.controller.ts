import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Product } from '../entities/product.entity';

const productRepository = getRepository(Product);

export const getAllProducts = async (req: Request, res: Response): Promise<void> => {
  const products = await productRepository.find();
  res.json(products);
};

export const getProductById = async (req: Request, res: Response): Promise<void> => {
  const productId = req.params.productId as string;
  const product = await productRepository.findOneById(productId);

  if (!product) {
    res.status(404).json({ message: 'Product not found' });
  } else {
    res.json(product);
  }
};
