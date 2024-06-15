import { configureStore } from "@reduxjs/toolkit";
import loaderSlice from "./reducers/loaderSlice";
import authSlice from "./reducers/authSlice";
import navberChange from "./reducers/navberChange";
import cartItems from "./reducers/cartItems";



export const store = configureStore({
  reducer: {
    loader: loaderSlice,
    auth: authSlice,
    navbar : navberChange,
    cart : cartItems,
  },
});
