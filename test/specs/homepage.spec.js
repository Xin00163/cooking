import HomePage from '../page-objects/home.page';

describe('Cookbook homepage', () => {

  before('Navigate to home page', () => {
    browser.url('/');
  });

  it('should render required elements', () => {
    expect(HomePage.cookbook.isVisible()).to.be.true;
  });
});
