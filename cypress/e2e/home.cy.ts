/* eslint-disable */
describe("Home Page - End-to-End Test", () => {
  let characters: any[];

  before(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
    cy.intercept("GET", "**/characters?limit=50**").as("getCharacters");
    cy.visit("/");
    cy.wait("@getCharacters").then((interception) => {
      expect(interception.response?.statusCode).to.equal(200);
      characters = interception.response?.body.data.results;
    });
  });

  it("should load the home page correctly", () => {
    cy.visit("/");
    cy.get(".header img.logo").should("be.visible");
  });

  it("should display the header", () => {
    cy.visit("/");
    cy.get(".header").should("be.visible");
    cy.get('[data-testid="favorite-icon"]').should("be.visible");
    cy.get(".favorite-count").should("be.visible");
  });

  it("should display a list of characters", () => {
    cy.get(".character-list").should("be.visible");
    cy.get(".character-list .character").should("have.length.greaterThan", 0);
  });

  it("should increment favorite count when clicking on heart icon", () => {
    cy.get(".favorite-count").then(($count) => {
      const initialCount = parseInt($count.text(), 10);
      cy.get(
        '.character-list .character:first-child [data-testid="outlined-heart-icon"]'
      ).click();
      cy.get(".favorite-count").should("contain", initialCount + 1);
    });
  });

  it("should display the same IDs in favorites as the ones clicked", () => {
    cy.get(
      '.character-list .character:last-child [data-testid="outlined-heart-icon"]'
    ).click();

    cy.get(".character-list .character:last-child")
      .invoke("attr", "data-character-id")
      .then((characterId) => {
        cy.get('[data-testid="favorite-icon"]').click();

        cy.get(".favorites .character-list .character")
          .should("have.length.greaterThan", 0)
          .each(($el) => {
            cy.wrap($el)
              .invoke("attr", "data-character-id")
              .should("eq", characterId);
          });
      });
  });
});
