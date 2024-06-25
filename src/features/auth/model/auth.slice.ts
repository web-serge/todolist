import { createSlice, isFulfilled, PayloadAction } from "@reduxjs/toolkit";
import { appActions } from "app/app.slice";
import { clearTasksAndTodolists } from "common/actions";
import { ResultCode } from "common/enums";
import { createAppAsyncThunk, handleServerAppError, thunkTryCatch } from "common/utils";
import { authAPI, LoginParamsType } from "features/auth/api/auth.api";

const login = createAppAsyncThunk<{ isLoggedIn: boolean }, LoginParamsType>("auth/login", async (arg, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  return thunkTryCatch(thunkAPI, async () => {
    const res = await authAPI.login(arg);
    if (res.data.resultCode === ResultCode.Success) {
      return { isLoggedIn: true };
    } else {
      const isShowAppError = !res.data.fieldsErrors.length;
      handleServerAppError(res.data, dispatch, isShowAppError);
      return rejectWithValue(res.data);
    }
  });
});

const logout = createAppAsyncThunk<{ isLoggedIn: boolean }, void>("auth/logout", async (_, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  return thunkTryCatch(thunkAPI, async () => {
    const res = await authAPI.logout();
    if (res.data.resultCode === ResultCode.Success) {
      dispatch(clearTasksAndTodolists());
      return { isLoggedIn: false };
    } else {
      handleServerAppError(res.data, dispatch);
      return rejectWithValue(null);
    }
  });
});

const initializeApp = createAppAsyncThunk<{ isLoggedIn: boolean }, void>("auth/initializeApp", async (_, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;

  const res = await authAPI.me().finally(() => {
    dispatch(appActions.setAppInitialized({ isInitialized: true }));
  });
  if (res.data.resultCode === ResultCode.Success) {
    return { isLoggedIn: true };
  } else {
    return rejectWithValue(res.data);
  }
});

const slice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      isFulfilled(authThunks.login, authThunks.logout, authThunks.initializeApp),
      (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
        state.isLoggedIn = action.payload.isLoggedIn;
      },
    );
  },
  selectors: {
    selectIsLoggedIn: state => state.isLoggedIn
  }
});

export const authSlice = slice.reducer;
export const {selectIsLoggedIn} = slice.selectors;
export const authThunks = { login, logout, initializeApp };
