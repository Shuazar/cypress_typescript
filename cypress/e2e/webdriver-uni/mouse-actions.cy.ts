/// <reference types="cypress" />

describe("Test mouse actions via webdriveruini", () => {
    it("Scroll element into view", () => {
      cy.visit("http://www.webdriveruniversity.com");
      cy.get("#actions")
        .scrollIntoView()
        .invoke("removeAttr", "target")
        .click({ force: true });
    });
    it("I should be able drag and drop a draggable item", () => {
      cy.visit("http://www.webdriveruniversity.com");
      cy.get("#actions")
        .scrollIntoView()
        .invoke("removeAttr", "target")
        .click({ force: true });
  
      cy.get("#draggable").trigger("mousedown", { which: 1 });
      cy.get("#droppable")
        .trigger("mousemove")
        .trigger("mouseup", { force: true });
    });
  
    it("Perform double mouse click item", () => {
      cy.visit("http://www.webdriveruniversity.com");
      cy.get("#actions")
        .scrollIntoView()
        .invoke("removeAttr", "target")
        .click({ force: true });
  
      cy.get("#double-click").dblclick();
    });
  
    it("I should be able hold down left mouse click button on a given element", () => {
      cy.visit("http://www.webdriveruniversity.com");
      cy.get("#actions")
        .scrollIntoView()
        .invoke("removeAttr", "target")
        .click({ force: true });
  
      cy.get("#click-box")
        .trigger("mousedown", { which: 1 })
        .then(($el) => {
          expect($el).to.have.css('background-color', 'rgb(0, 255, 0)');
        });
    });
  });