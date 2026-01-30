import { getFeedsApi, TFeedsResponse } from "@api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TOrder } from "@utils-types";

interface allOrdersState {
  orders: TOrder[];
  success: boolean;
  error?: string | null;
}

export const initialState: allOrdersState = {
  orders: [],
  success: false,
  error: null
};

export const fetchAllOrders = createAsyncThunk<TFeedsResponse>(
  'orders/all',
  async () => getFeedsApi()
);

const allOrdersSlice = createSlice({
  name: 'allOrders',
  initialState,
  reducers: {},
  selectors: {
    getAllOrdersSelector: (state) => state
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllOrders.pending, (state) => {
        state.success = false;
        state.orders = [];
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.success = true;
        state.orders = action.payload.orders;
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.success = false;
        state.error = action.error.message ?? 'Неизвестная ошибка';
      });
  }
});

export const { getAllOrdersSelector } = allOrdersSlice.selectors;
export default allOrdersSlice.reducer;
