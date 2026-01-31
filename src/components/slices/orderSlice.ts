import { orderBurgerApi } from "@api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface Order {
    ingredientsIds: string[],
    success: boolean,
    error: string
}

export const sendOrder = createAsyncThunk(
  'order/send',
  async (data: string[]) => orderBurgerApi(data)
);

const initialState: Order = {
    ingredientsIds: [],
    success: false,
    error: ''
}

const sendOrderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  selectors: {
    getOrderSelector: (state) => state
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendOrder.pending, (state) => {
        state.success = false;
        state.ingredientsIds = [];
      })
      .addCase(sendOrder.fulfilled, (state, action) => {
        state.success = true;
        state.ingredientsIds = action.payload;
      })
      .addCase(sendOrder.rejected, (state, action) => {
        state.success = false;
        state.error = action.error.message ?? 'Неизвестная ошибка';
      });
  }
});
