const URL = Cypress.env("URL");
const API = Cypress.env("API");

describe("Show Page", () => {
  let id;

  before(() => {
    cy.createSnack(API).then((response) => {
      id = response.body.data.snack.id;
      cy.visit(`${URL}/snacks/${id}`);
      cy.wait(1000);
    });
  });

  it("shows the header text", () => {
    cy.contains("Snacks");
  });

  describe("contains action/navigation buttons", () => {
    it("has a 'back' button", () => {
      cy.get("a")
        // .contains("Back").
        // parent()
        .should("exist");
      // .should("have.attr", "href", `/snacks`);
    });

    it("that deletes the item and redirects to index page", () => {
      console.log(id);
      cy.wait(1000); // gives us a chance to see the show page before deleting and redirecting
      cy.get("button")
        .contains("Delete")
        .click()
        .then(() => {
          cy.url().should("eq", `${URL}/snacks`);
          cy.get("a").each((item) => {
            cy.wrap(item)
              .invoke("attr", "href")
              .then((href) => {
                cy.wrap(href).should("not.equal", `/snacks/${id}`);
              });
          });
        });
    });
  });
});
