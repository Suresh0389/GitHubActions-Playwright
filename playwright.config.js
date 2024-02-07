const { defineConfig, devices } = require('@playwright/test');


module.exports = defineConfig({
  testDir: './tests',
  // timeout : 30 * 1000,
  reporter: 'html',
  retries : 1,
  workers : 3,

  expect : {
    timeout : 5000,
  },
 
  use: {
    browserName : 'chromium',
    headless : false,
    trace : 'retain-on-failure',
    screenshot : 'only-on-failure',
    // video : 'retain-on-failure',
    // viewport : {width:720, height:780},
    // ...devices['iPhone 14 Pro Max'],
    // ignoreHTTPSErrors : true,
    // permissions : [Geolocation],

    // launchOptions: {
    //   args: ["--start-maximized"],
    // },

  },
  


});

