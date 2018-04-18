import Search from '../page-objects/search.page';

describe('Cookbook search page', () => {
  before('Navigate to search page', () => {
    browser.url('/');
  });

  it('should render required elements', () => {
    expect(Search.searchBtn.isVisible()).to.be.true;
    Search.searchBtn.click();
    expect(Search.recipe.isVisible()).to.be.true;
  });
});
