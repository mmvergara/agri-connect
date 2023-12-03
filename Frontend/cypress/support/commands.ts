/// <reference types="cypress" />
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

// cypress/support/commands.js

Cypress.Commands.addAll({
  register(email: string, username: string, password: string) {
    cy.visit("/auth");
    cy.get('[data-cy="change-auth-mode-button"]').click();
    cy.get('[data-cy="email-input"]').type(email);
    cy.get('[data-cy="username-input"]').type(username);
    cy.get('[data-cy="password-input"]').type(password);
    cy.get('[data-cy="submit-auth-button"]').click();
    cy.contains("Account Created.", { timeout: 10000 });
  },

  login(email: string, password: string) {
    cy.visit("/auth");
    cy.get('[data-cy="email-input"]').type(email);
    cy.get('[data-cy="password-input"]').type(password);
    cy.get('[data-cy="submit-auth-button"]').click();
    cy.url().should("include", "/");
  },
});
