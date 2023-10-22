import { Request, Response } from 'express';
import ProductModel from '../models/product.model';

export const getAllProducts = async (req: Request, res: Response) => {
  const products = await ProductModel.find();
  res.json(products);
};

export const getProductById = async (req: Request, res: Response) => {
  const productId = req.params.productId;

  try {
    const product = await ProductModel.findById(productId);

    if (!product) {
      res.status(404).json({ message: 'Product not found' });
    } else {
      res.json(product);
    }
  } catch (error: any) {
    res.status(500).json({ message: 'Error retrieving product', error: error.message });
  }
};
