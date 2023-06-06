describe("Add multiple items to backet", () => {
  before(function () {
    cy.fixture("products").then((data) => {
      const products = data;
    });
  });

  beforeEach(function () {
    cy.visit("/");
    cy.get("a[href*='product/category&path=']").contains("Hair Care").click();
  });

  it("Add product to baket", () => {
    cy.fixture("products").then((productList) => {
      for (let i = 0; i < productList.length; i++) {
        debugger
        //cy.visit("https://www.automationteststore.com/");
        //cy.get("a[href*='product/category&path=']").contains("Hair Care").click();
        let name = productList[i]      
        cy.addProductToBacket(name);
        cy.log(name)
      }
    });
  });
});
