import {expect, test, describe} from '@jest/globals';
import reducer, { register, checkUser, initialState, updateUser, login, logout } from '../slices/profileSlice';

describe('тесты асинхронных экшенов обработки регистрации пользователя', () => {
    const mockProfileState = {
        user: {
            email: 'test@mail.ru',
            name: 'Diana'
        },
        isLoading: false,
        error: null,
        isSuccess: false,
    }

    test('отправка данных о регистрации пользователя', () => {
        const action = { type: register.pending.type }
        const result = reducer(initialState, action);

        expect(result.isSuccess).toBe(false);
        expect(result.error).toBeNull();
        expect(result.isLoading).toBe(true);
    })

    test('пользователь успешно зарегистрирован', () => {
        const action = {
            type: register.fulfilled.type,
            payload: { user: mockProfileState.user }
        }

        const result = reducer(initialState, action);

        expect(result.isSuccess).toBe(true);
        expect(result.error).toBeNull();
        expect(result.user).toEqual(mockProfileState.user);
        expect(result.isLoading).toBe(false);
    })

    test('ошибка регистрации пользователя', () => {
        const action = {
            type: register.rejected.type,
            error: { message: 'Ошибка регистрации' }
        }

        const result = reducer(initialState, action);

        expect(result.isSuccess).toBe(false);
        expect(result.isLoading).toBe(false);
        expect(result.error).toBe('Ошибка регистрации');
    })
});

describe('тесты асинхронных экшенов обработки логина пользователя', () => {
    const mockProfileState = {
        user: {
            email: 'test@mail.ru',
            name: 'Diana'
        },
        isLoading: false,
        error: null,
        isSuccess: false,
        isAuthenticated: false,
    }

    test('отправка данных о логине пользователя', () => {
        const action = { type: login.pending.type }
        const result = reducer(initialState, action);

        expect(result.isSuccess).toBe(false);
        expect(result.error).toBeNull();
        expect(result.isLoading).toBe(true);
    })

    test('пользователь успешно залогинился', () => {
        const action = {
            type: login.fulfilled.type,
            payload: { user: mockProfileState.user }
        }

        const result = reducer(initialState, action);

        expect(result.isSuccess).toBe(true);
        expect(result.error).toBeNull();
        expect(result.user).toEqual(mockProfileState.user);
        expect(result.isLoading).toBe(false);
        expect(result.isAuthenticated).toBe(true);
    })

    test('ошибка логина пользователя', () => {
        const action = {
            type: login.rejected.type,
            error: { message: 'Ошибка входа' }
        }

        const result = reducer(initialState, action);

        expect(result.isSuccess).toBe(false);
        expect(result.isLoading).toBe(false);
        expect(result.error).toBe('Ошибка входа');
    })
});

describe('тесты асинхронных экшенов обработки проверки пользователя', () => {
    const mockProfileState = {
        user: {
            email: 'test@mail.ru',
            name: 'Diana'
        },
        isLoading: false,
        error: null,
        isSuccess: false,
        isAuthenticated: false,
    }

    test('отправка проверки пользователя', () => {
        const action = { type: checkUser.pending.type }
        const result = reducer(initialState, action);

        expect(result.isAuthChecked).toBe(false);
    })

    test('пользователь успешно проверен', () => {
        const action = {
            type: checkUser.fulfilled.type,
            payload: { user: mockProfileState.user }
        }

        const result = reducer(initialState, action);

        expect(result.isAuthChecked).toBe(true);
        expect(result.user).toEqual(mockProfileState.user);
        expect(result.isAuthenticated).toBe(true);
    })

    test('ошибка проверки пользователя', () => {
        const action = { type: checkUser.rejected.type }

        const result = reducer(initialState, action);

        expect(result.isAuthenticated).toBe(false);
        expect(result.isAuthChecked).toBe(true);
    })
});

describe('тесты асинхронных экшенов апдейта данных пользователя', () => {
    const mockProfileState = {
        user: {
            email: 'test@mail.ru',
            name: 'Diana'
        },
        isLoading: false,
        error: null,
        isSuccess: false,
        isAuthenticated: false,
    }

    test('отправка новых данных пользователя', () => {
        const action = { type: updateUser.pending.type }
        const result = reducer(initialState, action);

        expect(result.isLoading).toBe(true);
    })

    test('данные успешно обновлены', () => {
        const action = {
            type: updateUser.fulfilled.type,
            payload: { user: mockProfileState.user }
        }

        const result = reducer(initialState, action);

        expect(result.isLoading).toBe(false);
        expect(result.user).toEqual(mockProfileState.user);
    })

    test('ошибка обновления данных', () => {
        const action = { 
            type: updateUser.rejected.type,
            error: { message: 'Не удалось обновить данные' }
        }

        const result = reducer(initialState, action);

        expect(result.isLoading).toBe(false);
        expect(result.error).toBe('Не удалось обновить данные');
    })
});

test('тест разлогина пользователя', () => {
    const result = reducer(initialState, logout());
    expect(result.user).toBeNull;
    expect(result.isAuthenticated).toBe(false);
    expect(result.isAuthChecked).toBe(true);
});
