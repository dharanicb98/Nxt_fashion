import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = { cart: [] , status: 'idle',
error: null};

export const fetchCartByUserId = createAsyncThunk(
  'cart/fetchCartByUserId',
  async (userId) => {
    const response = await fetch(`https://fakestoreapi.com/carts?userId=${userId}`);
    const data = await response.json();
    return data;
  }
);


export const cartItems = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCart: (state, action) => {
      const product = action.payload;
      const existingProduct = state.cart.find((item) => item.id === product.id);

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.cart.push({ ...product, quantity: 1, size: "" });
      }
    },
    removeCart: (state, action) => {
      const { id } = action.payload;
      state.cart = state.cart.filter((item) => item.id !== id);
    },
    increment: (state, action) => {
      const { id } = action.payload;
      const existingProduct = state.cart.find((item) => item.id === id);

      if (existingProduct) {
        existingProduct.quantity += 1;
      }
    },
    decrement: (state, action) => {
      const { id } = action.payload;
      const existingProduct = state.cart.find((item) => item.id === id);

      if (existingProduct && existingProduct.quantity > 1) {
        existingProduct.quantity -= 1;
      } else {
        state.cart = state.cart.filter((item) => item.id !== id);
      }
    },
    updateSize: (state, action) => {
      const { id, size } = action.payload;
      const existingProduct = state.cart.find((item) => item.id === id);

      if (existingProduct) {
        existingProduct.size = size;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartByUserId.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCartByUserId.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.cart = action.payload;
      })
      .addCase(fetchCartByUserId.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export const { addCart, removeCart, increment, decrement, updateSize } = cartItems.actions;
export default cartItems.reducer;
