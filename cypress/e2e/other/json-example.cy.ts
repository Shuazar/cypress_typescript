///<reference types="Cypress" />

describe("JSON object examples", () => {
  it("Json Object Exemples", () => {
    const exampleObject = {
      key: "Tim",
      key2: "Jones",
    };
    const exampleArrayOfValues = ["Sofie", "Rose", "Howard"];

    const users = {
      firstName: "Mikle",
      lastName: "Pirfect",
      age: 30,
      Students: [
        {
          firstName: "Mila",
          lastName: "Flait",
        },
        {
          firstName: "Mila1",
          lastName: "Flait1",
        },
      ],
    };
    cy.log(exampleObject["key"]);
    cy.log(exampleObject["key2"]);
    cy.log(exampleObject.key2);

    cy.log(exampleArrayOfValues[1]);

    cy.log(users.Students[0].firstName);
    cy.log(users.Students[0].lastName);
  });

});
