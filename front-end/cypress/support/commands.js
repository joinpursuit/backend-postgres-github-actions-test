// ***********************************************
// This example commands.js shows you how to
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
Cypress.Commands.add("createSnack", (url) => {
  return cy.request({
    method: "POST",
    url: `${url}/snacks`,
    body: {
      name: "Cherry Icee",
      image:
        "https://preview.redd.it/6bovojne7yl51.png?width=225&format=png&auto=webp&s=77aeac334ac53d995a155539c2614f2b488f279b",
      fiber: 0,
      protein: 0,
      added_sugar: 30,
    },
  });
});

Cypress.Commands.add("getAllSnacks", (url) => {
  return cy.request({ method: "GET", url: `${url}/snacks` });
});
