import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  login,
  createUser,
  signOut,
  CheckAuth,
  UpdateAuth,
  GetPermission,
  checkDataExist,
} from "./authAPI";

interface AuthState {
  checkAuth: boolean;
  status: "idle" | "loading";
  authInfo: any | null;
  error: any | null;
  dataIsValid?: boolean;
  dataValidaionError?: any;
  permission?: [];
}

const initialState: AuthState = {
  checkAuth: false,
  status: "idle",
  authInfo: null,
  error: null,
  permission: [],
};

export const createUserAsync = createAsyncThunk(
  "auth/createUser",
  async (userData: any = null, { rejectWithValue }) => {
    try {
      const response = await createUser(userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const checkDataExistAsync = createAsyncThunk(
  "auth/checkDataExist",
  async (userData: any = null, { rejectWithValue }) => {
    try {
      const response = await checkDataExist(userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const loginAsync = createAsyncThunk(
  "auth/login",
  async (loginInfo: any = null, { rejectWithValue }) => {
    try {
      const response = await login(loginInfo);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const checkAuthAsync = createAsyncThunk(
  "auth/check",
  async (_, { rejectWithValue }) => {
    try {
      const response = await CheckAuth();
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const signOutAsync = createAsyncThunk("auth/signOut", async () => {
  const response = await signOut();
  return response.data;
});

export const UpdateAuthAsync = createAsyncThunk(
  "auth/Update",
  async (update: any) => {
    const response = await UpdateAuth(update);
    return response.data;
  }
);

export const GetPermissionAsync = createAsyncThunk(
  "role/permission",
  async () => {
    const response = await GetPermission();
    if (response.data.success) {
      return response.data.data;
    }
    return {};
  }
);

export const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetDataIsValid: (state) => {
      state.dataIsValid = false;
    },
    resetError: (state) => {
      state.error = null;
    },
    resetDataValidaionError: (state) => {
      state.dataValidaionError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.authInfo = action.payload;
      })
      .addCase(createUserAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload;
      })
      .addCase(loginAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        loginAsync.fulfilled,
        (state, action: PayloadAction<{ user: any }>) => {
          state.status = "idle";
          state.authInfo = action.payload.user;
        }
      )
      .addCase(loginAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload;
      })
      .addCase(checkAuthAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.authInfo = action.payload;
        state.checkAuth = true;
      })
      .addCase(checkAuthAsync.rejected, (state) => {
        state.status = "idle";
        state.checkAuth = true;
      })
      .addCase(signOutAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signOutAsync.fulfilled, (state) => {
        state.status = "idle";
        state.authInfo = null;
      })
      .addCase(UpdateAuthAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(UpdateAuthAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.authInfo = action.payload;
      })
      .addCase(GetPermissionAsync.fulfilled, (state, action) => {
        state.permission = action.payload;
      });
  },
});

export const selectAuthInfo = (state: { auth: AuthState }) =>
  state.auth.authInfo;
export const selectcheckAuth = (state: { auth: AuthState }) =>
  state.auth.checkAuth;
export const selectAuthError = (state: { auth: AuthState }) =>
  state.auth.error?.err?.message;
export const selectAuthStatus = (state: { auth: AuthState }) =>
  state.auth.status;
export const selectPermission = (state: { auth: AuthState }) =>
  state.auth.permission;

export const { resetDataValidaionError, resetDataIsValid, resetError } =
  userSlice.actions;

export default userSlice.reducer;
