/// <reference types="cypress" />

describe("Verify radio-buttons via webdriveruini", () => {
    it("Check specific radio button", () => {
      cy.visit("http://www.webdriveruniversity.com");
      cy.get("#dropdown-checkboxes-radiobuttons")
        .invoke("removeAttr", "target")
        .click({ force: true });

        cy.get('#radio-buttons').find('input[type="radio"]').first().check()
        cy.get('#radio-buttons').find('input[type="radio"]').eq(1).check()
  
    });

    it.only("Validate the states of specific radio button", () => {
        cy.visit("http://www.webdriveruniversity.com");
        cy.get("#dropdown-checkboxes-radiobuttons")
          .invoke("removeAttr", "target")
          .click({ force: true });

          cy.get('[value="lettuce"]').should('not.be.checked')
          cy.get('[value="cabbage"]').should('be.disabled')
          cy.get('[value="pumpkin"]').should('be.checked')
    
      });

  });