/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      closeModalByCross(): Chainable<void>
      closeModalByEsc(): Chainable<void>
      closeModalByOverlay(): Chainable<void>
    }
  }
}

Cypress.Commands.add('closeModalByCross', () => {
  cy.get('[data-testid="modal-close"]').click();
  cy.get('[data-testid="modal"]').should('not.exist');
});

Cypress.Commands.add('closeModalByEsc', () => {
  cy.get('body').type('{esc}');
  cy.get('[data-testid="modal"]').should('not.exist');
});

Cypress.Commands.add('closeModalByOverlay', () => {
  cy.get('body').click(1, 1);
  cy.get('[data-testid="modal"]').should('not.exist');
});

export {};

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }
