import config from './config';

module.exports = {
  Search: (browser) => {
    browser
     .url(config.url)
     .click('#login')
     .setValue('Input[name=identifier]', 'assahna.awa@aun.edu.ng')
     .setValue('Input[name=password]', 'awa')
     .click('Input[type=submit]')
     .pause(5000)
     .assert.urlEquals('http://localhost:3000/')
     .waitForElementVisible('body')
     .assert.elementPresent('#search')
     .click('#search')
     .setValue('#search', 'React Test Full Rendering API')
     .assert.containsText('.card-title', 'React Test Full Rendering API')
     .pause(2000)
     .end();
  },
};
