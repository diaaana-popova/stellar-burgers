import {expect, test, describe} from '@jest/globals';
import reducer, { fetchAllOrders, initialState } from '../slices/allOrdersSlice';

describe('тесты асинхронных экшенов загрузки заказов', () => {
    const mockAllOrdersState = {
        orders: [
            {
            "_id": "6995b68ba64177001b32c5e6",
            "ingredients": [
                "643d69a5c3f7b9001cfa093c",
                "643d69a5c3f7b9001cfa093e",
                "643d69a5c3f7b9001cfa0947"
            ],
            "status": "done",
            "name": "Фалленианский люминесцентный краторный бургер",
            "createdAt": "2026-02-18T12:54:35.677Z",
            "updatedAt": "2026-02-18T12:54:35.886Z",
            "number": 101133
        },
        {
            "_id": "6995b50ca64177001b32c5dd",
            "ingredients": [
                "643d69a5c3f7b9001cfa093d",
                "643d69a5c3f7b9001cfa0941",
                "643d69a5c3f7b9001cfa093d"
            ],
            "status": "done",
            "name": "Био-марсианский флюоресцентный бургер",
            "createdAt": "2026-02-18T12:48:12.882Z",
            "updatedAt": "2026-02-18T12:48:13.097Z",
            "number": 101132
        }
        ],
        success: false,
        error: null,
        total: 2,
        totalToday: 2
    }

    test('идёт загрузка всех заказов', () => {
        const action = { type: fetchAllOrders.pending.type }
        const result = reducer(initialState, action);

        expect(result.success).toBe(false);
        expect(result.error).toBeNull();
        expect(result.orders).toEqual([]);
    })

    test('все заказы загружены', () => {
        const action = {
            type: fetchAllOrders.fulfilled.type,
            payload: mockAllOrdersState
        }

        const result = reducer(initialState, action);

        expect(result.success).toBe(true);
        expect(result.error).toBeNull();
        expect(result.orders).toEqual(mockAllOrdersState.orders);
        expect(result.total).toEqual(mockAllOrdersState.total);
        expect(result.totalToday).toEqual(mockAllOrdersState.totalToday);
    })

    test('ошибка загрузки ингредиентов', () => {
        const action = {
            type: fetchAllOrders.rejected.type,
            error: { message: 'Ошибка загрузки' }
        }

        const result = reducer(initialState, action);

        expect(result.success).toBe(false);
        expect(result.error).toBe('Ошибка загрузки');
    })
});
