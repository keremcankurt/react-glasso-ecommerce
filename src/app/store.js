import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import userReducer from "../features/user/userSlice";
import productReducer from "../features/product/productSlice";
import adminReducer from "../features/admin/adminSlice";

export const store = configureStore({
    reducer: {
      auth: authReducer,
      user: userReducer,
      product: productReducer,
      admin: adminReducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})