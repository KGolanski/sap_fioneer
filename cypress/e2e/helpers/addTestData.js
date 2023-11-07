export const addTestData = () => {
    
    cy.fixture('tabs.json').as(mainTabs)

  };
  