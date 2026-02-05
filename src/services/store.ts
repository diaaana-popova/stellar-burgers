import { combineReducers, configureStore } from '@reduxjs/toolkit';
import ingredientsSliceReducer from './slices/ingredientSlice';
import constructorSliceReducer from './slices/constructorSlice';
import allOrdersSliceReducer from './slices/allOrdersSlice';
import profileSliceReducer from './slices/profileSlice';
import sendOrderSlice from './slices/orderSlice';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

const rootReducer = combineReducers({
  ingredients: ingredientsSliceReducer,
  constructorReducer: constructorSliceReducer,
  allOrders: allOrdersSliceReducer,
  profile: profileSliceReducer,
  order: sendOrderSlice,
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
