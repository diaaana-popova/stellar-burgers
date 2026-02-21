import { initialState as ingredientsInitialState } from '../slices/ingredientSlice';
import { initialState as burgerConstructorInitialState} from '../slices/constructorSlice';
import { initialState as allOrdersInitialState} from '../slices/allOrdersSlice';
import { initialState as profileInitialState} from '../slices/profileSlice';
import { initialState as orderInitialState} from '../slices/orderSlice';
import { rootReducer } from '../store';
import {expect, test} from '@jest/globals';

test('инициализация root reducer', () => {
    const result = rootReducer(undefined, { type: '' });

    expect(result).toEqual({
        ingredients: ingredientsInitialState,
        constructorReducer: burgerConstructorInitialState,
        allOrders: allOrdersInitialState,
        profile: profileInitialState,
        order: orderInitialState,
    })
});
