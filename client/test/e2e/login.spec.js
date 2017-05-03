import config from './config';

module.exports = {
  beforeEach: (browser) => {
    browser
      .url(`${config.url}login`)
      .waitForElementVisible('body', 1000)
      .waitForElementVisible('#react-app', 1000);
  },
  'Invalid user': (browser) => {
    browser
      .setValue('input[type=email]', 'invalid@gmail.com')
      .setValue('input[type=password]', 'password')
      .click('button[type=submit]')
      .pause(1000)
      .assert.visible('#card-alert')
      .assert.urlEquals(`${config.url}login`);
  },
  'Login Users': (browser) => {
    browser
      .setValue('input[type=email]', 'regul13r@documan.api')
      .setValue('input[type=password]', 'regularuser')
      .click('button[type=submit]')
      .pause(1000)
      .assert.urlContains('app');
  },
  after: browser => browser.end()
};
