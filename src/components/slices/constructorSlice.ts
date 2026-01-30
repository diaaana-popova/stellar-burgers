import { getIngredientsApi, orderBurgerApi } from '@api';
import {
  createAsyncThunk,
  createSlice,
  nanoid,
  PayloadAction
} from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';

interface constructorState {
  items: {
    bun: TIngredient | null;
    ingredients: Array<TConstructorIngredient>;
  };
  orderRequest: boolean;
  orderModalData: TOrder | null;
}

export const initialState: constructorState = {
  items: {
    bun: null,
    ingredients: []
  },
  orderRequest: false,
  orderModalData: null
};

// export const sendOrder = createAsyncThunk<TOrder[]>(
//   'ingredients/sendOrder',
//   async () => orderBurgerApi(orderModalData)
// );

const constructorSlice = createSlice({
  name: 'burger-constructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        state.items.ingredients.push(action.payload);
      },
      prepare: (ingredient: TIngredient) => {
        const id = nanoid();
        return { payload: { ...ingredient, id } };
      }
    },
    addBun: (state, action: PayloadAction<TIngredient>) => {
      state.items.bun = action.payload;
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.items.ingredients = state.items.ingredients.filter(
        (i) => i.id !== action.payload
      );
    },
    moveIngredientUp: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      if (index <= 0) return;

      const ingredients = state.items.ingredients;
      [ingredients[index - 1], ingredients[index]] = [
        ingredients[index],
        ingredients[index - 1]
      ];
    },
    moveIngredientDown: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      if (index > state.items.ingredients.length) return;

      const ingredients = state.items.ingredients;
      [ingredients[index], ingredients[index + 1]] = [
        ingredients[index + 1],
        ingredients[index]
      ];
    }
  },
  selectors: {
    getConstructorSelector: (state) => state
  }
});

export const { getConstructorSelector } = constructorSlice.selectors;
export const {
  addIngredient,
  addBun,
  removeIngredient,
  moveIngredientUp,
  moveIngredientDown
} = constructorSlice.actions;
export default constructorSlice.reducer;
