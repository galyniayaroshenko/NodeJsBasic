import mongoose, { Schema, Document } from 'mongoose';
import { ObjectId } from 'bson';

interface ICartItem extends Document {
  product: string;
  count: number;
}

interface ICart extends Document {
  userId: string;
  isDeleted: boolean;
  items: ICartItem[];
}

const cartItemSchema = new Schema<ICartItem>({
  product: { type: ObjectId as any, ref: 'Product' },
  count: Number,
});

const cartSchema = new Schema<ICart>({
  userId: { type: ObjectId as any, ref: 'User' },
  isDeleted: Boolean,
  items: [cartItemSchema],
});

const CartModel = mongoose.model<ICart>('Cart', cartSchema);

export default CartModel;

// import { ProductEntity, product as bookProduct } from './product.model'

// export interface CartItemEntity {
//   product: ProductEntity;
//   count: number;
// }

// export interface CartEntity {
//   id: string; // uuid
//   userId: string;
//   isDeleted: boolean;
//   items: CartItemEntity[];
// }

// const cartItem: CartItemEntity = {
//   product: bookProduct,
//   count: 2,
// }

// export const cart: CartEntity = {
//   id: '1434fec6-cd85-420d-95c0-eee2301a971d',
//   userId: '0fe36d16-49bc-4aab-a227-f84df899a6cb',
//   isDeleted: false,
//   items: [cartItem],
// }
