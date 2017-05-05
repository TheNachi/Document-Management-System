import faker from 'faker';

import config from './config';

module.exports = {
  'Sign up': (browser) => {
    browser
        .url(config.url)
        .assert.containsText('.brand-logo', 'DMS')
        .element('css selector', '#signup')
        .click('#signup')
        .moveToElement('#signup', 0, 0)
        .mouseButtonClick(0)
        .pause(10000)
        .setValue('Input[name=username]', faker.internet.userName())
        .setValue('Input[name=firstName]', faker.name.firstName())
        .setValue('Input[name=lastName]', faker.name.lastName())
        .setValue('Input[type="email"]', faker.internet.email())
        .setValue('Input[type="password"]', 'password')
        .click('Input[type="submit"]')
        .pause(10000)
        .assert.urlEquals('http://localhost:3000/signup')
        .end();
  }
};
