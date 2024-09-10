import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import productService from "./productService";


const initialState = {
  products: [],
  recommendedProducts: [],
  banners: [],
  promotionalMessages: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};
export const getProducts = createAsyncThunk('product/get', async (data=null, thunkAPI) => {
  try {
    const response = await productService.getProducts();
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message);
    }
    return result;
  } catch (error) {
    toast.error(error.message);
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const getBanners = createAsyncThunk('product/banners', async (data=null, thunkAPI) => {
  try {
    const response = await productService.getBanners();
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message);
    }
    return result;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const getPromotionalMessages = createAsyncThunk('product/promotional-messages', async (data=null, thunkAPI) => {
  try {
    const response = await productService.getPromotionalMessages();
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message);
    }
    return result;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const getRecommendedProducts = createAsyncThunk('product/recommended-products', async (data=null, thunkAPI) => {
  try {
    const response = await productService.getRecommendedProducts();
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message);
    }
    return result.products;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});


  export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
      reset: (state) => {
        state.isError = false;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = "";
      },
      addProduct: (state,action) => {
        state.products.push(action.payload)
      },
      _addRecommendedProduct: (state,action) => {
        state.recommendedProducts.push(action.payload)
      },
      delRecommendedProduct: (state,action) => {
        state.recommendedProducts = state.recommendedProducts.filter(id => 
          id !== action.payload)
      },
      updatePromMessages: (state,action) => {
        state.promotionalMessages = action.payload
      },
      updateBanners: (state,action) => {
        state.banners = action.payload
      },
      deleteProduct: (state,action) => {
        const products = state.products.filter(p => p._id !== action.payload)
        state.products = products
      },
      updateProduct: (state,action) => {
        const {_id, updatedProduct } = action.payload
        const products = state.products.map(p => p._id !== _id ? p : updatedProduct)
        state.products = products
      },
      addCampaign: (state, action) => {
        const { productIds, endDate, discountPercentage } = action.payload;
      
        state.products = state.products.map((product) => {
          if (productIds.includes(product._id)) {
            return {
              ...product,
              campaign: {
                endDate,
                discountPercentage
              }
            };
          }
          return product;
        });
      }
      
    },
    extraReducers: (builder) => {
        builder
        .addCase(getProducts.pending, (state) => {
          state.isLoading = true
        })
        .addCase(getProducts.fulfilled, (state,action) => {
          state.isLoading = false
          state.products = action.payload;
        })
        .addCase(getProducts.rejected, (state,action) => {
          state.isLoading = false
        })
        .addCase(getBanners.fulfilled, (state,action) => {
          state.banners = action.payload;
        })
        .addCase(getPromotionalMessages.fulfilled, (state,action) => {
          state.promotionalMessages = action.payload
        })
        .addCase(getRecommendedProducts.fulfilled, (state,action) => {
          state.recommendedProducts = action.payload
        })
    }

});

export const { 
  reset, 
  addProduct, 
  addCampaign,
  deleteProduct, 
  updateProduct, 
  updateBanners,
  updatePromMessages, 
  delRecommendedProduct,
  _addRecommendedProduct,
 } = productSlice.actions;
export default productSlice.reducer;