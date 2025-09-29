"use client";

import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    setCart: (state, action) => {
      state.items = action.payload; // load giỏ hàng từ API
    },
    addToCart: (state, action) => {
      const product = action.payload;
      const exist = state.items.find((i) => i.id === product.id);
      if (exist) {
        exist.qty += 1;
      } else {
        state.items.push({ ...product, qty: 1 });
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },
    updateQty: (state, action) => {
      const { id, type } = action.payload;
      const item = state.items.find((i) => i.id === id);
      if (item) {
        if (type === "plus") item.qty += 1;
        if (type === "minus") item.qty = Math.max(1, item.qty - 1);
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { setCart, addToCart, removeFromCart, updateQty, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
