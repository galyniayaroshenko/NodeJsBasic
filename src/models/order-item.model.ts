import { Schema, Document, model } from 'mongoose';
import { IProduct } from './product.model';

export interface IOrderItem extends Document {
  product: IProduct;
  count: number;
}

export const orderItemSchema = new Schema<IOrderItem>({
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
  },
  count: Number,
});

const OrderItemModel = model<IOrderItem>('OrderItem', orderItemSchema);

export default OrderItemModel;
  