import { CartEntity, cart } from '../models/cart.model';

const carts: CartEntity[] = [cart];

export const createCart = (userId: string): CartEntity => {
  const cart: CartEntity = {
    id: 'some-uuid',
    userId,
    isDeleted: false,
    items: [],
  };

  carts.push(cart);

  return cart;
};

export const getCartByUserId = (userId: string): CartEntity | undefined => {
  return carts.find((cart) => cart.userId === userId && !cart.isDeleted);
};

export const updateCart = (userId: string, updatedCart: CartEntity): CartEntity | undefined => {
  const existingCart = getCartByUserId(userId);

  if (existingCart) {
    // Update the existing cart
    Object.assign(existingCart, updatedCart);
  }

  return existingCart;
};

export const emptyCart = (userId: string): boolean => {
  const cart = getCartByUserId(userId);

  if (cart) {
    cart.items = [];
    return true;
  }

  return false;
};
