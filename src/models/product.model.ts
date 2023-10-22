import { Schema, model, Document } from 'mongoose';

export interface IProduct extends Document {
  title: string;
  description: string;
  price: number;
}

const productSchema = new Schema<IProduct>({
  title: String,
  description: String,
  price: Number,
});

const ProductModel = model<IProduct>('Product', productSchema);

export default ProductModel;

// export interface ProductEntity {
//     id: string; // uuid
//     title: string;
//     description: string;
//     price: number;
// }
  
// export const product: ProductEntity = {
//     id: '51422fcd-0366-4186-ad5b-c23059b6f64f',
//     title: 'Book',
//     description: 'A very interesting book',
//     price: 100
// }
