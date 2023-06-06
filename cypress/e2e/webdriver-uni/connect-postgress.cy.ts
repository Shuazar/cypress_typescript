import cypress from "cypress";

it("Database test", () => {
  // call the task
  debugger
  const env = Cypress.env('running_env');
  
  cy.task("READFROMDB", {
    //get config from cypress.config.js
    
    dbConfig :Cypress.env(env).dbConfig,
    //dbConfig :Cypress.env(env),
    //sql we want to perform
    sql: "select * from topics",
  }).then((result: any) => {
    debugger;
    
    for (let i = 0; i < result.rows.length; i++) {
      cy.log(result.rows[i].topics);
      cy.log(result.rows[i].videos);
      console.log(result.rows)
      console.log(Cypress.env('domain'))
    }
  });
});
