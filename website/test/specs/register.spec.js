import Register from '../page-objects/register.page';

describe('Cookbook register page', () => {

  before('Navigate to register page', () => {
    browser.url('/register');
  });

  it.only('should show alert when required fields are not filled in', () => {
    browser.setValue(Register.userNameField, 'Xin')
    Register.registerBtn.click();
    expect(browser.alertText()).to.eq('Please fill in all fields')
  });


});
