import faker from 'faker';

import config from './config';

module.exports = {
  beforeEach: (browser) => {
    browser
      .url(`${config.url}signup`)
      .waitForElementVisible('body', 1000)
      .waitForElementVisible('#react-app', 1000);
  },
  'Successful Sign up': (browser) => {
    browser
        .setValue('input[name=username]', 'username_1')
        .setValue('input[name=firstname]', faker.name.firstName())
        .setValue('input[name=lastname]', faker.name.lastName())
        .setValue('input[name="email"]', faker.internet.email())
        .setValue('input[name="password"]', faker.internet.password())
        .setValue('input[name="verifyPassword"]', faker.internet.password())
        .click('button[type="submit"]')
        .pause(10000)
        .assert.urlContains('app')
        .end();
  },
  'Invalid sign up': (browser) => {
    browser
        .setValue('input[name=username]', '')
        .setValue('input[name=firstname]', faker.name.firstName())
        .setValue('input[name=lastname]', faker.name.lastName())
        .setValue('input[name="email"]', faker.internet.email())
        .setValue('input[name="password"]', faker.internet.password())
        .setValue('input[name="verifyPassword"]', faker.internet.password())
        .click('button[type="submit"]')
        .pause(10000)
        .assert.visible('div[id="card-alert"]')
        .assert.urlEquals(`${config.url}signup`)
        .end();
  },
  after: browser => browser.end()
};
