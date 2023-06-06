/// <reference types="cypress" />

describe("Handlng Iframe & Modals", () => {
    it("Handling webdriveruni frames & modals", () => {
      cy.visit("http://www.webdriveruniversity.com");
      cy.get("#iframe").invoke("removeAttr", "target").click({ force: true });
      
      cy.get('#frame').then(($iframe)=>{
        const body = $iframe.contents().find('body')
        cy.wrap(body).as('iframe')
      })

      cy.get('@iframe').find('#button-find-out-more').click()
      cy.get('@iframe').find('#myModal').as('modal')
      cy.get('@modal').then(($modalText)=>{
        const text = $modalText.text()
        expect(text).to.include('Welcome to webdriveruniversity.com we sell a wide range of electrical goods such')
      })

      cy.get('@modal').get('[type="button"]').first().then(($text)=>{
        const textEl = $text.text()
        cy.log(textEl)
      })
    });
});  