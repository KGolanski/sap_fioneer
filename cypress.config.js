const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://www.sapfioneer.com/',
    excludeSpecPattern: ['*/*/1-getting-started/*', '*/*/2-advanced-examples/*'],       
  },
});
