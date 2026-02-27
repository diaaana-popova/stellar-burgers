import {expect, test, describe} from '@jest/globals';
import reducer, { fetchIngredients, initialState } from '../slices/ingredientSlice';

describe('тесты асинхронных экшенов загрузки ингредиентов', () => {
    const mockIngredientState = {
        items: [
            {
            "_id": "643d69a5c3f7b9001cfa0941",
            "name": "Биокотлета из марсианской Магнолии",
            "type": "main",
            "proteins": 420,
            "fat": 142,
            "carbohydrates": 242,
            "calories": 4242,
            "price": 424,
            "image": "https://code.s3.yandex.net/react/code/meat-01.png",
            "image_mobile": "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
            "image_large": "https://code.s3.yandex.net/react/code/meat-01-large.png",
            "__v": 0
        },
        {
            "_id": "643d69a5c3f7b9001cfa093e",
            "name": "Филе Люминесцентного тетраодонтимформа",
            "type": "main",
            "proteins": 44,
            "fat": 26,
            "carbohydrates": 85,
            "calories": 643,
            "price": 988,
            "image": "https://code.s3.yandex.net/react/code/meat-03.png",
            "image_mobile": "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
            "image_large": "https://code.s3.yandex.net/react/code/meat-03-large.png",
            "__v": 0
        },
        ],
        isLoading: false,
        error: null
    }

    test('идёт загрузка ингредиентов', () => {
        const action = { type: fetchIngredients.pending.type }
        const result = reducer(initialState, action);

        expect(result.isLoading).toBe(true);
        expect(result.error).toBeNull();
    })

    test('ингредиенты успешно загружены', () => {
        const action = {
            type: fetchIngredients.fulfilled.type,
            payload: mockIngredientState
        }

        const result = reducer(initialState, action);

        expect(result.isLoading).toBe(false);
        expect(result.error).toBeNull();
        expect(result.items).toEqual(mockIngredientState);
    })

    test('ошибка загрузки ингредиентов', () => {
        const action = {
            type: fetchIngredients.rejected.type,
            error: { message: 'Ошибка загрузки' }
        }

        const result = reducer(initialState, action);

        expect(result.isLoading).toBe(false);
        expect(result.error).toBe('Ошибка загрузки');
    })
});
