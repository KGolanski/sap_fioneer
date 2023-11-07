const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  e2e: {
    baseUrl: 'https://www.sapfioneer.com/',
    excludeSpecPattern: ['*/*/1-getting-started/*', '*/*/2-advanced-examples/*'],
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },       
  },
});
