import {expect, test, describe} from '@jest/globals';
import reducer, { clearOrder, getMyOrder, initialState, sendOrder } from '../slices/orderSlice';

describe('тесты асинхронных экшенов отправки заказа', () => {
    const mockOrderState = {
        currentOrder: {
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
        myOrders: [
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
        isLoading: false
    }

    test('идёт отправка заказа', () => {
        const action = { type: sendOrder.pending.type }
        const result = reducer(initialState, action);

        expect(result.success).toBe(false);
        expect(result.error).toBeNull();
        expect(result.isLoading).toBe(true);
    })

    test('заказ отправлен', () => {
        const action = {
            type: sendOrder.fulfilled.type,
            payload: { order: mockOrderState.currentOrder}
        }

        const result = reducer(initialState, action);

        expect(result.success).toBe(true);
        expect(result.error).toBeNull();
        expect(result.currentOrder).toEqual(mockOrderState.currentOrder);
        expect(result.isLoading).toBe(false);
    })

    test('ошибка загрузки ингредиентов', () => {
        const action = {
            type: sendOrder.rejected.type,
            error: { message: 'Ошибка загрузки' }
        }

        const result = reducer(initialState, action);

        expect(result.success).toBe(false);
        expect(result.isLoading).toBe(false);
        expect(result.error).toBe('Ошибка загрузки');
    })

    test('загрузка всех заказов пользователя', () => {
        const action = {
            type: getMyOrder.fulfilled.type,
            payload: mockOrderState.myOrders
        }

        const result = reducer(initialState, action);

        expect(result.myOrders).toEqual(mockOrderState.myOrders);
    })
});

test('тест очистки заказа', () => {
    const result = reducer(initialState, clearOrder());
    expect(result.currentOrder).toBeNull;
});
