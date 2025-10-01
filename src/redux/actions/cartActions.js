
export const removeFromCartAsync = (id) => ({
  type: 'REMOVE_FROM_CART_ASYNC',
  payload: id,
});

export const updateQtyAsync = ({ id, type }) => ({
  type: 'UPDATE_QTY_ASYNC',
  payload: { id, type },
});


export const removeFromCart = (id) => ({
  type: 'REMOVE_FROM_CART',
  payload: id,
});

export const updateQty = (payload) => ({
  type: 'UPDATE_QTY',
  payload,
});

export const setCart = (items) => ({
  type: 'SET_CART',
  payload: items,
});