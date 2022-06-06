const URL = Cypress.env("URL");
const API = Cypress.env("API");
const CI_ENV = Cypress.env("ci");

let id = 0;

describe("Show Page", () => {
  before(() => {
    cy.createSnack(API).then((response) => {
      id = response.body.data.snack.id;
      cy.visit(`${URL}/snacks/${id}`);
    });
  });

  it("shows the header text", () => {
    cy.contains("Snacks");
  });

  it("can navigate to New page", () => {
    cy.get("a")
      .contains("New Snack")
      .should("have.attr", "href", `/snacks/new`);
  });

  describe("snack with its information", () => {
    it("shows the correct healthy heart image", () => {
      cy.get("aside img").should("have.attr", "alt", "unhealthy food");
    });
    it("shows the image of the snack", () => {
      cy.get("article div img").should("have.attr", "alt", "Cherry Icee");
    });
    it("shows the protein amount of the snack", () => {
      cy.get("article div").contains("Protein: 0");
    });
    it("shows the fiber amount of the snack", () => {
      cy.get("article div").contains("Fiber: 0");
    });
    it("shows the Added Sugar of the snack", () => {
      cy.get("article div").contains("Added Sugar: 30");
    });
  });

  describe("contains action/navigation buttons", () => {
    it("has a 'back' button", () => {
      cy.get("button")
        .contains("Back")
        .parent()
        .should("have.attr", "href", `/snacks`);
    });

    it("that deletes the item and redirects to index page", () => {
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
