import Login from '../page-objects/login.page';

describe('Cookbook login page', () => {

  before('Navigate to login page', () => {
    browser.url('/login');
  });

  it('should render required elements', () => {
    expect(Login.loginBtn.isVisible()).to.be.true;
  });

  it.only('should show alert when required fields are not filled in', () => {
      browser.setValue(Login.userNameField, 'Xin');
      Login.loginBtn.click();
      expect(browser.alertText()).to.eq('Please fill in all fields')
  });

  it('should navigate to contact page', () => {
      Login.contact.moveToObject();
      Login.contact.waitForVisible();
      Login.contact.click();
      expect(browser.getUrl()).to.contain('/contact');
  });

  it('should navigate to recipe store page', () => {
      Login.recipeStore.moveToObject();
      Login.recipeStore.waitForVisible();
      Login.recipeStore.click();
      expect(browser.getUrl()).to.contain('/recipeStore');
  });

  it('should navigate to the register page', () => {
      Login.register.moveToObject();
      Login.register.waitForVisible();
      Login.register.click();
      expect(browser.getUrl()).to.contain('/register');
  });

  it('should navigate to the search page', () => {
      Login.search.moveToObject();
      Login.search.waitForVisible();
      Login.search.click();
      expect(browser.getUrl()).to.equal('http://localhost:3000/');
  });

});
