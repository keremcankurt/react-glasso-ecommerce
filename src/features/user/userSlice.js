import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "./userService";


const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  user: null,
  cart: []
};
export const profile = createAsyncThunk('user/profile', async (data=null, thunkAPI) => {
  try {
    const response = await userService.getProfile();
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message);
    }
    return result.user;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const favProduct = createAsyncThunk('user/fav', async (id,thunkAPI) => {
  try {
    const response = await userService.favProduct(id);
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message);
    }
    return id;
  } catch (error) {
      if(error.message === "You are not authorized to access this route"){
        thunkAPI.dispatch(logoutUser());
      }
      return thunkAPI.rejectWithValue(error.message);
  }
});
export const getCart = createAsyncThunk('user/cart', async (cart,thunkAPI) => {
  try {
    const response = await userService.getCart(JSON.stringify(cart));
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message);
    }
    return result;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
    }
});
  export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
      reset: (state) => {
        state.isError = false;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = "";
      },
      logoutUser: (state) => {
        state.isError = false;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = "";
        state.user = null;
      },
      loginUser: (state, action) => {
        state.user = action.payload
        state.isSuccess = true
        state.isError = false
      },
      addCart: (state,action) => {
        state.cart.push(action.payload);
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart.push({[action.payload._id]: action.payload.quantity })
        localStorage.setItem("cart", JSON.stringify(cart));
      },
      decreaseQuantityOrder: (state, action) => {
        const updatedCart = state.cart.map((item) =>
          item._id === action.payload && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      
        const updatedCartIds = updatedCart.map((item) => ({
          [item._id]: item.quantity
        }));
      
        localStorage.setItem('cart', JSON.stringify(updatedCartIds));
      
        state.cart = updatedCart;
      },
      increaseQuantityOrder: (state, action) => {
        const updatedCart = state.cart.map((item) =>
          item._id === action.payload && item.quantity < ((item.stock > 5) ? 5 : item.stock)
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      
        const updatedCartIds = updatedCart.map((item) => ({
          [item._id]: item.quantity
        }));
      
        localStorage.removeItem('cart');
        localStorage.setItem('cart', JSON.stringify(updatedCartIds));
      
        state.cart = updatedCart;
      },
      deleteOrder: (state,action) => {
        const updatedCart = state.cart.filter((item) => item._id !== action.payload);
        state.cart = updatedCart;
        const cart = state.cart.map(item => ({
          [item._id]: item.quantity
        }));
        localStorage.removeItem(cart)
        localStorage.setItem('cart', JSON.stringify(cart))
        
      },
    },
    extraReducers: (builder) => {
        builder
        .addCase(profile.pending, (state) => {
          state.isLoading = true
        })
        .addCase(profile.fulfilled, (state,action) => {
          state.isLoading = false
          state.user = action.payload
          state.isSuccess = true
        })
        .addCase(profile.rejected, (state,action) => {
          state.isLoading = false
          state.isError = true
        })
        .addCase(favProduct.fulfilled, (state, action) => {
          const productId = action.payload;
        
          const isFavorited = state.user.favProducts.includes(productId);
        
          if (isFavorited) {
            state.user.favProducts = state.user.favProducts.filter(
              (id) => id !== productId
            );
          } else {
            state.user.favProducts.push(productId);
          }
        })
        .addCase(getCart.fulfilled, (state,action) => {
          state.cart = action.payload
          const cart = action.payload.map(item => ({
            [item._id]: item.quantity
          }));
          localStorage.removeItem(cart)
          localStorage.setItem('cart', JSON.stringify(cart))
        })
        
    }

});

export const { 
  reset,
  logoutUser,
  loginUser,
  addCart,
  decreaseQuantityOrder,
  deleteOrder,
  increaseQuantityOrder
 } = userSlice.actions;
export default userSlice.reducer;