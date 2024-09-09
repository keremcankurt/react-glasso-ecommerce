import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import adminService from "./adminService";
import { logoutUser } from "../auth/authSlice";
import { addProduct, 
  deleteProduct, 
  updatePromMessages,
  updateProduct as _updateProduct,
  updateBanners, 
} from "../product/productSlice";


const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};
export const createNewProduct = createAsyncThunk('admin/add-product', async (data=null, thunkAPI) => {
  try {
    const response = await adminService.addProduct(JSON.stringify(data));
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message);
    }
    thunkAPI.dispatch(addProduct(result.product))
    toast.success(result.message)
    return result.message;
  } catch (error) {
    toast.error(error.message);
    if(error.message === "You are not authorized to access this route"){
      thunkAPI.dispatch(logoutUser());
    }
    return thunkAPI.rejectWithValue(error.message);
  }
});
export const removeProduct = createAsyncThunk('admin/remove-product', async (id=null, thunkAPI) => {
  try {
    const response = await adminService.deleteProduct(id);
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message);
    }
    thunkAPI.dispatch(deleteProduct(id))
    toast.success(result.message)
    return result.message;
  } catch (error) {
    toast.error(error.message);
    if(error.message === "You are not authorized to access this route"){
      thunkAPI.dispatch(logoutUser());
    }
    return thunkAPI.rejectWithValue(error.message);
  }
});
export const updateProduct = createAsyncThunk('admin/update-product', async (data, thunkAPI) => {
  try {
    const response = await adminService.updateProduct(data._id, JSON.stringify(data.updatedProduct));
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message);
    }
    thunkAPI.dispatch(_updateProduct(data))
    toast.success(result.message)
    return result.message;
  } catch (error) {
    toast.error(error.message);
    if(error.message === "You are not authorized to access this route"){
      thunkAPI.dispatch(logoutUser());
    }
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const addPromotionalMessage = createAsyncThunk('admin/add-promotional-message', async (data, thunkAPI) => {
  try {
    const response = await adminService.addPromotionalMessage(JSON.stringify(data));
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message);
    }
    thunkAPI.dispatch(updatePromMessages(result.messages))
    toast.success(result.message)
    return result.message;
  } catch (error) {
    toast.error(error.message);
    if(error.message === "You are not authorized to access this route"){
      thunkAPI.dispatch(logoutUser());
    }
    return thunkAPI.rejectWithValue(error.message);
  }
});
export const delPromotionalMessage = createAsyncThunk('admin/delete-promotional-message', async (id, thunkAPI) => {
  try {
    const response = await adminService.deletePromotionalMessage(id);
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message);
    }
    thunkAPI.dispatch(updatePromMessages(result.messages))
    toast.success(result.message)
    return result.message;
  } catch (error) {
    toast.error(error.message);
    if(error.message === "You are not authorized to access this route"){
      thunkAPI.dispatch(logoutUser());
    }
    return thunkAPI.rejectWithValue(error.message);
  }
});
export const addBanner = createAsyncThunk('admin/add-banner', async (data, thunkAPI) => {
  try {
    const response = await adminService.addBanner(JSON.stringify(data));
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message);
    }
    thunkAPI.dispatch(updateBanners(result.banners))
    toast.success(result.message)
    return result.message;
  } catch (error) {
    toast.error(error.message);
    if(error.message === "You are not authorized to access this route"){
      thunkAPI.dispatch(logoutUser());
    }
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const deleteBanner = createAsyncThunk('admin/delete-banner', async (id, thunkAPI) => {
  try {
    const response = await adminService.deleteBanner(id);
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message);
    }
    thunkAPI.dispatch(updateBanners(result.banners))
    toast.success(result.message)
    return result.message;
  } catch (error) {
    toast.error(error.message);
    if(error.message === "You are not authorized to access this route"){
      thunkAPI.dispatch(logoutUser());
    }
    return thunkAPI.rejectWithValue(error.message);
  }
});


  export const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
      reset: (state) => {
        state.isError = false;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = "";
      },
    },
    extraReducers: (builder) => {
        builder
        .addCase(createNewProduct.pending, (state) => {
          state.isLoading = true
        })
        .addCase(createNewProduct.fulfilled, (state,action) => {
          state.isLoading = false
        })
        .addCase(createNewProduct.rejected, (state,action) => {
          state.isLoading = false
        })
        .addCase(removeProduct.pending, (state) => {
          state.isLoading = true
        })
        .addCase(removeProduct.fulfilled, (state,action) => {
          state.isLoading = false
        })
        .addCase(removeProduct.rejected, (state,action) => {
          state.isLoading = false
        })
        .addCase(updateProduct.pending, (state) => {
          state.isLoading = true
        })
        .addCase(updateProduct.fulfilled, (state,action) => {
          state.isLoading = false
        })
        .addCase(updateProduct.rejected, (state,action) => {
          state.isLoading = false
        })
        .addCase(addPromotionalMessage.pending, (state) => {
          state.isLoading = true
        })
        .addCase(addPromotionalMessage.fulfilled, (state,action) => {
          state.isLoading = false
        })
        .addCase(addPromotionalMessage.rejected, (state,action) => {
          state.isLoading = false
        })
        .addCase(delPromotionalMessage.pending, (state) => {
          state.isLoading = true
        })
        .addCase(delPromotionalMessage.fulfilled, (state,action) => {
          state.isLoading = false
        })
        .addCase(delPromotionalMessage.rejected, (state,action) => {
          state.isLoading = false
        })
        .addCase(addBanner.pending, (state) => {
          state.isLoading = true
        })
        .addCase(addBanner.fulfilled, (state,action) => {
          state.isLoading = false
        })
        .addCase(addBanner.rejected, (state,action) => {
          state.isLoading = false
        })
        .addCase(deleteBanner.pending, (state) => {
          state.isLoading = true
        })
        .addCase(deleteBanner.fulfilled, (state,action) => {
          state.isLoading = false
        })
        .addCase(deleteBanner.rejected, (state,action) => {
          state.isLoading = false
        })
    }

});

export const { reset } = adminSlice.actions;
export default adminSlice.reducer;