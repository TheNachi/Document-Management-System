module.exports = {
  beforeEach: (browser) => {
    browser
      .url('http://localhost:5000/app/')
      .waitForElementVisible('body', 1000)
      .waitForElementVisible('#react-app > div', 1000);
  },
  'App Starts': (browser) => {
    browser
      .assert
      .visible(
        '#react-app > div',
        'Check if app has rendered with React');
  },
  after: browser => browser.end(),
};
