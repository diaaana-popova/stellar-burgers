import {expect, test, describe} from '@jest/globals';
import reducer, { initialState, addIngredient, addBun, removeIngredient, moveIngredientUp, moveIngredientDown, clearIngredients } from '../slices/constructorSlice';

describe('тесты редьюсеров конструктора бургеров', () => {
        const newMockIngredient1 = {
            "_id": "643d69a5c3f7b9001cfa0944",
            "name": "Соус традиционный галактический",
            "type": "sauce",
            "proteins": 42,
            "fat": 24,
            "carbohydrates": 42,
            "calories": 99,
            "price": 15,
            "image": "https://code.s3.yandex.net/react/code/sauce-03.png",
            "image_mobile": "https://code.s3.yandex.net/react/code/sauce-03-mobile.png",
            "image_large": "https://code.s3.yandex.net/react/code/sauce-03-large.png",
            "__v": 0
        }

        const newMockIngredient2 = {
            "_id": "643d69a5c3f7b9001cfa0944",
            "name": "Соус традиционный галактический",
            "type": "sauce",
            "proteins": 42,
            "fat": 24,
            "carbohydrates": 42,
            "calories": 99,
            "price": 15,
            "image": "https://code.s3.yandex.net/react/code/sauce-03.png",
            "image_mobile": "https://code.s3.yandex.net/react/code/sauce-03-mobile.png",
            "image_large": "https://code.s3.yandex.net/react/code/sauce-03-large.png",
            "__v": 0
        }

        const newMockBun = {
            "_id": "643d69a5c3f7b9001cfa093c",
            "name": "Краторная булка N-200i",
            "type": "bun",
            "proteins": 80,
            "fat": 24,
            "carbohydrates": 53,
            "calories": 420,
            "price": 1255,
            "image": "https://code.s3.yandex.net/react/code/bun-02.png",
            "image_mobile": "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
            "image_large": "https://code.s3.yandex.net/react/code/bun-02-large.png",
            "__v": 0
        }

    test('добавление ингредиента', () => {
        const newState = reducer(initialState, addIngredient(newMockIngredient1));

        expect(newState.items.ingredients).toHaveLength(initialState.items.ingredients.length + 1);
        expect(newState.items.ingredients.at(-1)?._id).toBe(newMockIngredient1._id);
    })

    test('добавление булки', () => {
        const newState = reducer(initialState, addBun(newMockBun));

        expect(newState.items.bun).toBe(newMockBun);
    })

    test('удаление ингредиента', () => {
        const stateWithNewIngredient1 = reducer(initialState, addIngredient(newMockIngredient1));
        const stateWithNewIngredients = reducer(stateWithNewIngredient1, addIngredient(newMockIngredient2));

        const [item1, item2] = stateWithNewIngredients.items.ingredients;

        const newState = reducer(stateWithNewIngredients, removeIngredient(item1.id))

        expect(newState.items.ingredients.find(i => i.id === item1.id)).toBeUndefined;
        expect(newState.items.ingredients[0].id).toBe(item2.id);
    })

    test('переместить ингредиент наверх', () => {
        const stateWithNewIngredient1 = reducer(initialState, addIngredient(newMockIngredient1));
        const stateWithNewIngredients = reducer(stateWithNewIngredient1, addIngredient(newMockIngredient2));

        const newState = reducer(stateWithNewIngredients, moveIngredientUp(1));
        expect(newState.items.ingredients[0]).toEqual(stateWithNewIngredients.items.ingredients[1]);
    })

    test('переместить ингредиент вниз', () => {
        const stateWithNewIngredient1 = reducer(initialState, addIngredient(newMockIngredient1));
        const stateWithNewIngredients = reducer(stateWithNewIngredient1, addIngredient(newMockIngredient2));

        const newState = reducer(stateWithNewIngredients, moveIngredientDown(0));
        expect(newState.items.ingredients[1]).toEqual(stateWithNewIngredients.items.ingredients[0]);
    })

    test('очистить все ингредиенты', () => {
        const newState = reducer(initialState, clearIngredients());
        expect(newState.items.bun).toBeNull();
        expect(newState.items.ingredients).toEqual([]);
    })
})

