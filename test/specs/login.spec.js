import Login from '../page-objects/login.page';

describe('Cookbook login page', () => {

  before('Navigate to login page', () => {
    browser.url('/login');
  });

  it('should render required elements', () => {
    expect(Login.loginBtn.isVisible()).to.be.true;
  });
});
