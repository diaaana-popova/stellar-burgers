describe('Constructor Page ingredients testing', () => {
    beforeEach(() => {
        cy.intercept('GET', '**/ingredients*', {
            fixture: 'ingredients.json'
        }).as('getIngredients');

        cy.visit('/');
        cy.viewport(1280, 720);

        cy.wait('@getIngredients');
    })

    it('страница загружается', () => {
        cy.contains('Соберите бургер').should('exist');
    })

    it('ингредиенты отображаются корректно', () => {
        cy.contains('Краторная булка N-200i').should('exist');
        cy.contains('Кристаллы марсианских альфа-сахаридов').should('exist');
    })

    it('ингредиенты добавляются в конструктор', () => {
        cy.get('[data-testid="ingredient.643d69a5c3f7b9001cfa0948"]')
        .contains('Добавить')
        .click();

        cy.get('[data-testid="ingredient.643d69a5c3f7b9001cfa0944"]')
        .contains('Добавить')
        .click();

        cy.get('[data-testid="ingredient.643d69a5c3f7b9001cfa093d"]')
        .contains('Добавить')
        .click();

        cy.get('[data-testid="bun-div"]').should('contain.text', 'Флюоресцентная булка R2-D3');
        cy.get('[data-testid="ingredients-li"]').should('contain.text', 'Кристаллы марсианских альфа-сахаридов');
    })

    it('модальное окно корректно открывается', () => {
        cy.get('[data-testid="ingredient.643d69a5c3f7b9001cfa0948"]')
        .click();

        cy.contains('Детали ингредиента').should('exist');
        cy.contains('Кристаллы марсианских альфа-сахаридов').should('exist');
    })

    it('модальное окно корректно закрывается по клику на крестик', () => {
        cy.get('[data-testid="ingredient.643d69a5c3f7b9001cfa0948"]')
        .click();

        cy.get('[data-testid="modal-close"]').click();

        cy.get('[data-testid="modal"]').should('not.exist');
    })

    it('модальное окно корректно закрывается по клику на оверлей', () => {
        cy.get('[data-testid="ingredient.643d69a5c3f7b9001cfa0948"]')
        .click();

        cy.get('body').click(1, 1);

        cy.get('[data-testid="modal"]').should('not.exist');
    })
})

describe('Constructor Page profile testing', () => {
    function addIngredients() {
        cy.get('[data-testid="ingredient.643d69a5c3f7b9001cfa0948"]')
        .contains('Добавить')
        .click();

        cy.get('[data-testid="ingredient.643d69a5c3f7b9001cfa0944"]')
        .contains('Добавить')
        .click();

        cy.get('[data-testid="ingredient.643d69a5c3f7b9001cfa093d"]')
        .contains('Добавить')
        .click();
    }

    beforeEach(() => {
        cy.intercept('GET', '**/auth/user', {
            fixture: 'profile.json'
        }).as('getUser');


        cy.intercept('POST', '**/orders', {
            statusCode: 200,
            body: {
                success: true,
                order: {
                    number: 12345678
                }
            }
        }).as('createOrder');

        cy.intercept('GET', '**/ingredients*', {
            fixture: 'ingredients.json'
        }).as('getIngredients');

        cy.visit('/', {
            onBeforeLoad(win) {
                win.localStorage.setItem('refreshToken', 'mock-refresh-token');
            }
        });

        cy.setCookie('accessToken', 'mock-access-token');

        cy.wait('@getIngredients');

        cy.viewport(1280, 720);

        addIngredients();

        cy.get('[data-testid="create-order"]')
        .contains('Оформить заказ')
        .click();

        cy.wait('@getUser');
        cy.wait('@createOrder');

        cy.contains('идентификатор заказа').should('exist');
    });

    afterEach(() => {
        cy.clearCookie('accessToken');

        cy.window().then((win) => {
            win.localStorage.removeItem('refreshToken');
        });
    });

    it('по клику на кнопку оформить заказ проверяем пользователя, оформляем заказ, открываем модалку', () => {
        cy.contains('12345678').should('be.visible');

        cy.get('[data-testid="modal-close"]').click();
        cy.get('[data-testid="modal"]').should('not.exist');
    })

    it('модальное окно корректно закрывается по клику на крестик', () => {
        cy.get('[data-testid="modal-close"]').click();
        cy.get('[data-testid="modal"]').should('not.exist');
    })

    it('модальное окно корректно закрывается по клику на оверлей', () => {        
        cy.get('body').click(1, 1);

        cy.get('[data-testid="modal"]').should('not.exist');
    })

    it('конструктор пуст', () => {
        cy.get('[data-testid="modal-close"]').click();

        cy.get('[data-testid="constructor"]').should('contain.text', 'Выберите булки');
        cy.get('[data-testid="constructor"]').should('contain.text', 'Выберите начинку');
    })
    
})
