import faker from 'faker';
import config from './config';

module.exports = {
  'Create document': (browser) => {
    browser
     .url(config.url)
     .click('#login')
     .setValue('Input[name=identifier]', 'tobeydaniels@gmail.com')
     .setValue('Input[name=password]', 'turinturamba')
     .click('Input[type=submit]')
     .pause(5000)
     .assert.urlEquals('http://localhost:4000/app/')
     .waitForElementVisible('body')
     .assert.elementPresent('.hero-btn')
     .click('.hero-btn')
     .pause(1000)
     .assert.urlEquals('http://localhost:4000/app/document')
     .waitForElementVisible('body')
     .setValue('#title', faker.lorem.word())
     .setValue('#content', faker.lorem.words())
     .click('#access option[value="private"]')
     .click('Input[type="submit"]')
     .end();
  }
};
