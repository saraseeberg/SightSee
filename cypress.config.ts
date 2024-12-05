import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'http://it2810-33.idi.ntnu.no/project2/',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
})
