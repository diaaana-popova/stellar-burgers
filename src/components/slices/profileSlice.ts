import { loginUserApi, registerUserApi, TAuthResponse, TLoginData, TRegisterData, getUserApi } from "@api";
import { createAsyncThunk, createSlice, isRejectedWithValue } from "@reduxjs/toolkit";
import { setCookie } from '../../utils/cookie';
import { TUser } from "@utils-types";

export interface ProfileState {
  user: TUser | null
  isLoading: boolean,
  error: string | null,
  isSuccess: boolean,
  isAuthenticated: boolean,
  isAuthChecked: boolean
}

export const initialState: ProfileState = {
  user: null,
  isLoading: false,
  error: '',
  isSuccess: false,
  isAuthenticated: false,
  isAuthChecked: false
};

export const register = createAsyncThunk(
  'profile/register',
   async ({ email, name, password }: TRegisterData) => registerUserApi({ email, name, password })
);

export const checkUser = createAsyncThunk(
  'profile/checkUser',
   async () => getUserApi()
);

export const login = createAsyncThunk(
  'profile/login',
   async ({ email, password }: TLoginData) => {
    const data = await loginUserApi({ email, password })
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data;
   }
);

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  selectors: {
    getProfileSelector: (state) => state
  },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                state.isSuccess = false;
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message ?? 'Неизвестная ошибка';
                state.isSuccess = false;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.isLoading = false;
                state.error = null;
                state.isSuccess = true;
            }),
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                state.isSuccess = false;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message ?? 'Неизвестная ошибка';
                state.isSuccess = false;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.isLoading = false;
                state.error = null;
                state.isSuccess = true;
            }),
        builder
            .addCase(checkUser.pending, (state) => {
                state.isAuthChecked = false;
            })
            .addCase(checkUser.rejected, (state) => {
                state.isAuthChecked = true;
                state.isAuthenticated = false;
            })
            .addCase(checkUser.fulfilled, (state, action) => {
                state.isAuthChecked = true;
                state.user = action.payload.user;
                state.isAuthenticated = true;
            })
}});

export const { getProfileSelector } = profileSlice.selectors;
export default profileSlice.reducer;
