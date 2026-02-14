import { loginUserApi, registerUserApi, TLoginData, TRegisterData, getUserApi, updateUserApi, logoutApi } from "@api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteCookie, setCookie } from '../../utils/cookie';
import { TUser } from "@utils-types";
import { create } from "domain";
import { useDispatch } from '../store';

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

export const updateUser = createAsyncThunk(
    'profile/update',
    async (data: Partial<TRegisterData>) => updateUserApi(data)
);

export const userLogout = createAsyncThunk(
    'profile/logout',
    async (_, { dispatch }) => {
        await logoutApi();

        deleteCookie('accessToken');
        localStorage.removeItem('refreshToken');

        dispatch(logout());
  }
)

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
  reducers: {
    logout: (state) => {
        state.user = null;
        state.isAuthChecked = true;
        state.isAuthenticated = false;
    }
  },
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
                state.isAuthenticated = true;
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
        builder
            .addCase(updateUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message ?? 'Неизвестная ошибка';
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.isLoading = false;
            })
}});

export const { getProfileSelector } = profileSlice.selectors;
export const { logout } = profileSlice.actions;
export default profileSlice.reducer;
