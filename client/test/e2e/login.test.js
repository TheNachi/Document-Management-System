import config from './config';

module.exports = {
  'Login Users': (browser) => {
    browser
      .url(config.url)
      .waitForElementVisible('body')
      .click('#login')
      .setValue('Input[name=identifier]', 'tobeydaniels@gmail.com')
      .setValue('Input[name=password]', 'turinturamba')
      .click('Input[type=submit]')
      .pause(1000)
      .assert.urlEquals('http://localhost:4000/app/')
      .end();
  },
  'Invalid user': (browser) => {
    browser
      .url(config.url)
      .waitForElementVisible('body')
      .click('#login')
      .setValue('Input[name=identifier]', 'sese@gmail.com')
      .setValue('Input[name=password]', 'password')
      .click('Input[type=submit]')
      .pause(1000)
      .assert.urlContains('login')
      .end();
  }
};
