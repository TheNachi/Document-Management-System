import config from './config';

module.exports = {
  beforeEach: (browser) => {
    browser
      .url(config.url)
      .waitForElementVisible('body', 1000)
      .waitForElementVisible('#react-app', 1000);
  },
  'App Starts': (browser) => {
    browser
            .assert.title('iAmDocuman')
            .assert
            .visible(
              '#react-app > div',
              'Check if app has rendered with React');
  },
  'Landing page': (browser) => {
    browser
        .expect
        .element('h1').text.to.equal('iAmDocuman');
  },
  'Landing page elements': (browser) => {
    browser
      .expect
      .element('.navbar-login-btn')
        .text.to.equal('LOGIN');
    browser
      .expect
      .element('.navbar-signup-btn')
        .text.to.equal('SIGN UP');
    browser
      .expect
      .element('.intro-text-title')
        .text.to.equal('Create, Manage and Extend');
    browser
      .expect
      .element('.header-text')
        .text.to.equal(
          'Store, share and manage all your business files on the cloud.'
        );
    browser
      .expect
      .element('.react-navbar')
        .to.have.css('background-color')
        .which.equals('rgba(34, 34, 34, 1)');
    browser
      .expect
      .element('li.active > img')
      .to.have.css('background-image')
      .which.equals(
        'url("http://localhost:5000/images/carousel_image_1.jpg")'
      );
    browser
      .expect
      .element('a.intro-link')
      .text.to.equal('DOCUMENTATION');
  },
  'Change route on link click': (browser) => {
    browser
      .click('.navbar-login-btn')
      .pause(1000)
      .assert.urlContains(`${config.url}login`);
    browser
      .click('.navbar-signup-btn')
      .pause(1000)
      .assert.urlContains(`${config.url}signup`);
    browser
      .click('.react-navbar > h1')
      .pause(1000)
      .assert.urlContains(config.url);
    browser
      .click('a.intro-link')
      .pause(5000)
      .assert.urlContains(config.rootUrl);
  },
  after: browser => browser.end()
};
