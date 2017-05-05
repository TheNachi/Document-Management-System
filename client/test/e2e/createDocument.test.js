import faker from 'faker';
import config from './config';

module.exports = {
  'Create document': (browser) => {
    browser
     .url(config.url)
     .click('#login')
     .setValue('Input[name=identifier]', 'assahna.awa@aun.edu.ng')
     .setValue('Input[name=password]', 'awa')
     .click('Input[type=submit]')
     .pause(5000)
     .assert.urlEquals('http://localhost:3000/')
     .waitForElementVisible('body')
     .assert.elementPresent('.hero-btn')
     .click('#createdocument')
     .pause(1000)
     .assert.urlEquals('http://localhost:3000/document')
     .waitForElementVisible('body')
     .setValue('#title', faker.lorem.word())
     .setValue('#content', faker.lorem.words())
     .click('#access option[value="private"]')
     .click('Input[type="submit"]')
     .end();
  }
};
