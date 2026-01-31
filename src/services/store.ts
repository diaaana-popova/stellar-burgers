import { combineReducers, configureStore } from '@reduxjs/toolkit';
import ingredientsSliceReducer from '../components/slices/ingredientSlice';
import constructorSliceReducer from '../components/slices/constructorSlice';
import allOrdersSliceReducer from '../components/slices/allOrdersSlice';
import profileSliceReducer from '../components/slices/profileSlice';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

const rootReducer = combineReducers({
  ingredients: ingredientsSliceReducer,
  constructorReducer: constructorSliceReducer,
  allOrders: allOrdersSliceReducer,
  profile: profileSliceReducer
}); // Заменить на импорт настоящего редьюсера

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
