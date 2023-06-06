/// <reference types="cypress" />

beforeEach(() => {
  cy.visit("https://www.automationteststore.com/");
});

describe("Alias invoke", () => {
    it("Navigate to specific product page", () => {
      cy.get("a[href*='product/category&path=']").contains("Hair Care").click();
      cy.get(".fixed_wrapper .prdocutname")
        .eq(0)
        .invoke("text")
        .as("productThumbnail");
      cy.get("@productThumbnail").its("length").should("be.gt", 5);
      cy.get("@productThumbnail").should("include", "Seaweed Conditioner");
    });
  
    it("Validate product thumbnail", () => {
      cy.get(".thumbnail").as("productThumbnail");
      cy.get("@productThumbnail").should("have.length", 16);
      cy.get("@productThumbnail")
        .find(".productcart")
        .invoke("attr", "title")
        .should("include", "Add to Cart");
    });
  
    it.only("Calculate total of normal and sale products", () => {
      cy.get(".thumbnail").as("productThumbnail");
      // cy.get("@productThumbnail").find('.oneprice').each(($el, index, $list) => {
      //     cy.log($el.text())
      // });
      var itemsTotal =0;
      cy.get(".thumbnail").find(".oneprice").invoke("text").as("itemPrice");
      cy.get("@itemPrice").then(($linkText:any) => {
        var itemPrice = $linkText.split("$");
        var i;
        var totalPrice = 0;
        for (i = 0; i < itemPrice.length; i++) {
          totalPrice = totalPrice + Number(itemPrice[i]);
          cy.log(itemPrice[i]);
        }
        itemsTotal = totalPrice;
        cy.log("Total Price : " + totalPrice);
      });
      cy.log('Total price : '+ itemsTotal)
    });
  
    it('Confirm links redirects to correct pages', ()=>{
       cy.visit('http://www.webdriveruniversity.com')
       cy.get('#contact-us').invoke('removeAttr','target').click({force:true})
       cy.url().should('include','contactus')
       cy.go('forward')
       cy.reload()
       cy.url().should('include','http://www.webdriveruniversity.com')
  
       cy.go('forward')
       cy.url().should('include','contactus')
  
       cy.go('back')
       cy.get('#login-portal').invoke('removeAttr','target').click({force:true})
       cy.url().should('include','Login-Portal')
       cy.go('back')
  
       
    })
  });
  