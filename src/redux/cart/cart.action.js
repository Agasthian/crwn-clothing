import cartActionTypes from './cart.action.types';

export const toggleCartHidden = () => ({
  type: cartActionTypes.TOGGLE_HIDDEN_CART
});

export const addItem = item => ({
  type: cartActionTypes.ADD_ITEMS,
  payload: item
});

export const clearItemFromCart = item => ({
  type: cartActionTypes.CLEAR_ITEM_FROM_CART,
  payload: item
});

export const removeItem = item => ({
  type: cartActionTypes.REMOVE_ITEM,
  payload: item
});
