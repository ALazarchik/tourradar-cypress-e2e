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
declare namespace Cypress {
    interface Chainable<Subject> {
        openHomePage(): Chainable<any>
    }
}

Cypress.Commands.add('openHomePage', () => {
    cy.intercept("POST", "https://www.tourradar.com/serp/load/230").as("loadTours");
    cy.intercept("POST", "https://www.tourradar.com/api/serp/savings").as("savings");
    cy.intercept("POST", "https://omnimove.tourradar.com/api/**").as("omnimove");
    cy.visit('/');
});
