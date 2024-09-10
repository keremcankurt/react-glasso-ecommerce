import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import authService from "./authService";
import { loginUser, logoutUser } from "../user/userSlice";


const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
  try {
    const response = await authService.login(JSON.stringify(user));
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message);
    }
    thunkAPI.dispatch(loginUser(result))
    return result;
  } catch (error) {
    toast.error(error.message);
    return thunkAPI.rejectWithValue(error.message);
  }
});
export const logout = createAsyncThunk('auth/logout', async (data=null,thunkAPI) => {
  try {
    const response = await authService.logout();
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message);
    }
    //düzenle
    toast.success(result.message);
    thunkAPI.dispatch(logoutUser())
    return result;
  } catch (error) {
    toast.error(error.message);
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const register = createAsyncThunk('auth/register', async (user, thunkAPI) => {
  try {
    const response = await authService.register(JSON.stringify(user));
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message);
    }
    toast.success(result.message);
    return result;
  } catch (error) {
    toast.error(error.message);
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const forgotPassword = createAsyncThunk('auth/forgotpassword', async (data, thunkAPI) => {
  try {
    const response = await authService.forgotPassword(JSON.stringify(data));
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message);
    }
    toast.success(result.message);
    return result;
  } catch (error) {
    toast.error(error.message);
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const changePassword = createAsyncThunk('auth/changepassword', async (data, thunkAPI) => {
  try {
    const response = await authService.changePassword(JSON.stringify(data));
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message);
    }
    toast.success(result.message);
    return result;
  } catch (error) {
    toast.error(error.message);
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const confirmAccount = createAsyncThunk('auth/confirmAccount', async (data, thunkAPI) => {
  try {
    const response = await authService.confirmAccount(data);
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message);
    }
    return result.message;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});


  export const authSlice = createSlice({
    name: "auth",
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
        .addCase(login.pending, (state) => {
          state.isLoading = true
        })
        .addCase(login.fulfilled, (state,action) => {
          state.isLoading = false
        })
        .addCase(login.rejected, (state,action) => {
          state.isLoading = false
        })
        .addCase(register.pending, (state) => {
          state.isLoading = true
        })
        .addCase(register.fulfilled, (state,action) => {
          state.isLoading = false
          state.isSuccess = true
        })
        .addCase(register.rejected, (state,action) => {
          state.isLoading = false
        })
        .addCase(forgotPassword.pending, (state) => {
          state.isLoading = true
        })
        .addCase(forgotPassword.fulfilled, (state,action) => {
          state.isLoading = false
          state.isSuccess = true
        })
        .addCase(forgotPassword.rejected, (state,action) => {
          state.isLoading = false
        })
        .addCase(changePassword.pending, (state) => {
          state.isLoading = true
        })
        .addCase(changePassword.fulfilled, (state,action) => {
          state.isLoading = false
          state.isSuccess = true
        })
        .addCase(changePassword.rejected, (state,action) => {
          state.isLoading = false
        })
        .addCase(confirmAccount.pending, (state) => {
          state.isLoading = true
        })
        .addCase(confirmAccount.fulfilled, (state,action) => {
          state.isLoading = false
          state.isSuccess = true
          state.message = action.payload
        })
        .addCase(confirmAccount.rejected, (state,action) => {
          state.isLoading = false
          state.message = action.payload
        })
        .addCase(logout.fulfilled, (state,action) => {
          state.isLoading = false
          state.isSuccess = false
          state.isError = false
          state.message = ""
        })
    }

});

export const { reset } = authSlice.actions;
export default authSlice.reducer;