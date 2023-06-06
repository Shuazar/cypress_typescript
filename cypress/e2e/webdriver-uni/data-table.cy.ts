/// <reference types="cypress" />

describe("Handling data via webdriveruini", () => {
  beforeEach(() => {
    cy.visit("http://www.webdriveruniversity.com");
    cy.get("#data-table").invoke("removeAttr", "target").click({ force: true });
  });
  it("Calculate and assert the total age all users", () => {
    let userDetails: any[] = [];
    let numb = 0;
    cy.get("#thumbnail-1 td")
      .each(($el, index, $list) => {
        //debugger
        let nn = $el.text();
        userDetails[index] = $el.text();
      })
      .then(() => {
        var i;
        for (i = 0; i < userDetails.length; i++) {
          if (Number(userDetails[i])) {
            numb += Number(userDetails[i]);
          }
        }
        cy.log("Total age: " + numb);
        expect(numb).above(200);
        expect(numb).to.eq(322);
      });
  });

  it("Calculate and assert the the age of a given user based on last name", () => {
    cy.get("#thumbnail-1 tr td:nth-child(2)").each(($el, index, $list) => {
      const text = $el.text();
      if (text.includes("Woods")) {
        cy.get("#thumbnail-1 tr td:nth-child(2)")
          .eq(index)
          .next()
          .then((age) => {
            const userAge = age.text();
            expect(Number(userAge)).to.eq(80);
          });
      }
    });
  });
});
