import config from './config';

module.exports = {
  Search: (browser) => {
    browser
     .url(config.url)
     .click('#login')
     .setValue('Input[name=identifier]', 'tobeydaniels@gmail.com')
     .setValue('Input[name=password]', 'turinturamba')
     .click('Input[type=submit]')
     .pause(5000)
     .assert.urlEquals('http://localhost:4000/app/')
     .waitForElementVisible('body')
     .assert.elementPresent('#search')
     .click('#search')
     .setValue('#search', 'React Test Full Rendering API')
     .assert.containsText('.card-title', 'React Test Full Rendering API')
     .pause(2000)
     .end();
  },
};
