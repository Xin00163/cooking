import HomePage from '../page-objects/home.page';

describe('Cookbook homepage', () => {

  before('Navigate to home page', () => {
    browser.url('/');
  });

  it('should render required elements', () => {
    expect(HomePage.cookbook.isVisible()).to.be.true;
  });

  it('should navigate to recipe store', () => {
    HomePage.recipeStore.moveToObject();
    HomePage.recipeStore.waitForVisible();
    HomePage.recipeStore.click();
    expect(browser.getUrl()).to.equal('http://localhost:3000/recipeStore');
  });
  
});
