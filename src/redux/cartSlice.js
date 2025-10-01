// src/redux/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // ✅ Thêm 2 action này
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    updateQty: (state, action) => {
      const { id, type } = action.payload;
      const item = state.items.find(item => item.id === id);
      if (item) {
        if (type === 'plus') {
          item.qty += 1;
        } else if (type === 'minus' && item.qty > 1) {
          item.qty -= 1;
        }
      }
    },
    resetCart: (state) => {
      state.items = [];
    },
    // ✅ Thêm action này để set cart từ localStorage hoặc API
    setCart: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const { removeFromCart, updateQty,resetCart,setCart } = cartSlice.actions;
export default cartSlice.reducer;