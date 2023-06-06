// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('addProductToBacket', (productName) => {
    cy.get(".fixed_wrapper .prdocutname").each(($el, index, $list) => {
      cy.log(productName)
      if ($el.text() === productName) {
        cy.log($el.text());
        cy.get(".productcart").eq(index).click();
      }
    });
  });
  
  Cypress.Commands.add("selectProduct", (productName) => {
    cy.get(".fixed_wrapper .prdocutname").each(($el, index, $list) => {
      if ($el.text().includes(productName)) {
        cy.wrap($el).click();
      }
      //cy.log("Index: "+index + " : "+$el.text())
    });
  });
  
  Cypress.Commands.add('waitForResources', (resources = []) => {
    if (Cypress.browser.family === 'firefox') {
      cy.log('Skip waitForResource in Firefox');
      return;
    }
  
    if (resources.length) {
      cy.log(`Waiting for idle network ${resources.join()}`);
    } else {
      cy.log('Waiting for idle network');
    }
  
    const timeout = Cypress.config('defaultCommandTimeout');
    const checkInternal = 500;
    const waitForIdleTimes = 1;
    let idleTimes = waitForIdleTimes;
    let resourcesLengthPrevious: any;
    let networkLengthPrevious: any;
  
    cy.window({ log: false }).then({ timeout }, (win) => {
      return new Cypress.Promise((resolve, reject) => {
        let foundResource: any;
  
        const interval = setInterval(() => {
          const performanceEntries = win.performance.getEntriesByType('resource');
          // @ts-ignore
          const resourcesLoaded = performanceEntries.filter(
            // @ts-ignore
            (r) => !['script', 'xmlhttprequest'].includes(r.initiatorType)
          );
          // @ts-ignore
          const networkRequests = performanceEntries.filter((r) =>
            // @ts-ignore
            ['script', 'xmlhttprequest'].includes(r.initiatorType)
          );
          const allFilesFound = resources.every((resource) => {
            const found = resourcesLoaded.filter((resourceLoaded) => {
              // @ts-ignore
              return resourceLoaded.name.includes(resource.name);
            });
            if (found.length === 0) {
              return false;
            }
            // @ts-ignore
            return !resource.number || found.length >= resource.number;
          });
  
          if (allFilesFound) {
            if (
              (resources.length &&
                resourcesLoaded.length === resourcesLengthPrevious) ||
              networkRequests.length === networkLengthPrevious
            ) {
              idleTimes -= 1;
            } else {
              idleTimes = waitForIdleTimes;
              resourcesLengthPrevious = resourcesLoaded.length;
              networkLengthPrevious = networkRequests.length;
            }
          }
  
          if (idleTimes) {
            return;
          }
  
          clearInterval(interval);
  
          resolve(cy.log('Network seems idle'));
        }, checkInternal);
  
        setTimeout(() => {
          if (foundResource || idleTimes === 0) {
            // nothing needs to be done, successfully found the resource
            return;
          }
  
          clearInterval(interval);
          reject(new Error('Timed out waiting for resource'));
        }, timeout);
      });
    });
  });
  

