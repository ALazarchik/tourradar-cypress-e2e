import { defineConfig } from "cypress";

export default defineConfig({
  viewportHeight: 1080,
  viewportWidth: 1920,
  e2e: {
    baseUrl: "https://www.tourradar.com/d/europe",
    specPattern: "cypress/e2e/**/*.spec.{ts,tsx}",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
