import { userFactory } from '../../../factories/userfactory';

it('Should be submit success form',()=>{
    cy.visit('https://www.automationteststore.com/')
    cy.get("a[href$='contact']").click().then(function(linkText){
        cy.log("Clicked using link text " + linkText.text())
    })

    cy.get('#ContactUsFrm_first_name').type(userFactory.getUser().firstName)
    cy.get('#ContactUsFrm_first_name').then(($element)=>{
        console.log('YRYTRYTRYT :', $element.text())
    })
    cy.get('#ContactUsFrm_email').type(userFactory.getUser().email)
    cy.get('#ContactUsFrm_enquiry').type(userFactory.getUser().message)
    cy.get('.col-md-6 > .btn').click()
    cy.get('.contentpanel').as('contuct')
    cy.get('@contuct').find('.mb40 > :nth-child(3)').should('be.visible').then((message)=>{
    
    })
})

it('Should be submit success form UserDerails fro fixture',()=>{
    cy.visit('https://www.automationteststore.com/')
    cy.get("a[href$='contact']").click().then(function(linkText){
        cy.log("Clicked using link text " + linkText.text())
    })
    cy.fixture('userDetails').then((userFixture)=>{
        cy.get('#ContactUsFrm_first_name').type(userFixture.first_name)
        cy.get('#ContactUsFrm_email').type(userFixture.email)
        cy.get('#ContactUsFrm_enquiry').type(userFixture.message)
    })    
    cy.get('.col-md-6 > .btn').click()
    cy.get('.contentpanel').as('contuct')
    cy.get('@contuct').find('.mb40 > :nth-child(3)').should('be.visible').then((message)=>{
    
    })
})
