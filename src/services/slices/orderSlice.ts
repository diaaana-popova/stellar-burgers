import { getOrdersApi, orderBurgerApi } from "@api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TOrder } from "@utils-types";

export interface Order {
    currentOrder: TOrder | null,
    myOrders: TOrder[],
    success: boolean,
    error: string | null,
    isLoading: boolean
}

export const sendOrder = createAsyncThunk(
  'order/send',
  async (data: string[]) => orderBurgerApi(data)
);

const initialState: Order = {
    currentOrder: null,
    myOrders: [],
    success: false,
    error: null,
    isLoading: false
}

export const getMyOrder = createAsyncThunk(
    'myorder/get',
    async () => getOrdersApi()
)

const sendOrderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrder: (state) => {state.currentOrder = null}
  },
  selectors: {
    getOrderSelector: (state) => state
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendOrder.pending, (state) => {
        state.success = false;
        state.isLoading = true;
      })
      .addCase(sendOrder.fulfilled, (state, action) => {
        state.success = true;
        state.currentOrder = action.payload.order;
        state.isLoading = false;
      })
      .addCase(sendOrder.rejected, (state, action) => {
        state.success = false;
        state.error = action.error.message ?? 'Неизвестная ошибка';
        state.isLoading = false;
      });
      builder
      .addCase(getMyOrder.fulfilled, (state, action) => {
        state.myOrders = action.payload
      })
  }
});

export const { getOrderSelector } = sendOrderSlice.selectors;
export const { clearOrder } = sendOrderSlice.actions;
export default sendOrderSlice.reducer;
