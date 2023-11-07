
/// <reference types="cypress" />

context("E2E automation pack", () => {

  beforeEach(() => {
    cy.viewport('macbook-13')
    cy.visit('')
    cy.url().should("include", "sapfioneer.com");
    cy.intercept('https://www.sapfioneer.com/cdn-cgi/rum?').as('GetQuery');
    cy.get('@GetQuery').then((xhr => {  
      cy.wait('@GetQuery').its('response.statusCode').should('eq',204);
    }))
  })


  afterEach(() => {
    cy.clearLocalStorage()
  })

  describe('Naviagation tests', () => {

    const contactButton = 'div[id="masthead"] li > div.header-button'

    it('ensure main menu optios are visible on the home page', () => {    
      cy.fixture('tabs.json').then((data) => {
        for (var index in data) {
          cy.get(`div[id="masthead"] li[id=${data[index].id}]`).should('be.visible').and('include.text',`${data[index].name}`) 
        }
      }) 
    })

    it('ensure if user has been redirected to the Financial Control page ', () => {    
      cy.get(`div[id="masthead"] li[id="menu-item-29979"]`).should('be.visible').and('include.text',`Finance & ESG`).invoke('show').click({force: true})
      cy.get('a').contains('Financial Control').click({force: true})
      cy.url().should("include", "/financial-control/");
    })

    it('check validations msg under contact form ', () => {    
      cy.get(contactButton).click()
      cy.url().should("include", "/contact/");
      cy.switchToIframe('iframe[id="hs-form-iframe-0"]').find('input[type="submit"]').should("be.visible").click()
      cy.switchToIframe('iframe[id="hs-form-iframe-0"]').find('ul[role=alert] li').eq(0).invoke('text').and('have.string','Please complete this required field.');
      cy.switchToIframe('iframe[id="hs-form-iframe-0"]').find('ul[role=alert] li').eq(1).invoke('text').and('have.string','Please complete this required field.');
      cy.switchToIframe('iframe[id="hs-form-iframe-0"]').find('ul[role=alert] li').eq(2).invoke('text').and('have.string','Please complete this required field.');
      cy.switchToIframe('iframe[id="hs-form-iframe-0"]').find('ul[role=alert] li').eq(3).invoke('text').and('have.string','Please select an option from the dropdown menu.');
      cy.switchToIframe('iframe[id="hs-form-iframe-0"]').find('ul[role=alert] li').eq(4).invoke('text').and('have.string','Please complete this required field.');
      cy.switchToIframe('iframe[id="hs-form-iframe-0"]').find('ul[role=alert] li').eq(5).invoke('text').and('have.string','Please complete this required field.');
      cy.switchToIframe('iframe[id="hs-form-iframe-0"]').find('div.hs_error_rollup > ul > li > label').invoke('text').and('have.string','Please complete all required fields.');  
    })
  })  
})