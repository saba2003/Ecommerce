export const ADD_TO_CART = 'ADD_TO_CART';
export const INCREASE_QUANTITY = 'INCREASE_QUANTITY';
export const DECREASE_QUANTITY = 'DECREASE_QUANTITY';
export const CLEAR_CART = 'CLEAR_CART';

export const addToCart = (product) => ({
  type: ADD_TO_CART,
  payload: product
});

export const increaseQuantity = (id) => ({
  type: INCREASE_QUANTITY,
  payload: id
});

export const decreaseQuantity = (id) => ({
  type: DECREASE_QUANTITY,
  payload: id
});

export const clearCart = () => ({
  type: CLEAR_CART,  // Action to clear the cart
});