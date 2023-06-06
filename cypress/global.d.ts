/// <reference types="cypress" />

declare namespace Cypress {
    interface Chainable {
        addProductToBacket(productName: any ) : Chainable;
        selectProduct(productName: string ) : Chainable;
        waitForResources(resources?: string[]): Chainable;
    }
}