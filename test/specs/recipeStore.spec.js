import RecipeStore from '../page-objects/recipeStore.page';

describe('Cookbook recipeStore page', () => {

  before('Navigate to recipeStore page', () => {
    browser.url('/recipeStore');
  });

  it('should render required elements', () => {
      expect(RecipeStore.backToSearchBtn.isVisible()).to.be.true;
      expect(RecipeStore.recipeName.isVisible()).to.be.true;
      expect(RecipeStore.cookingTime.isVisible()).to.be.true;
      expect(RecipeStore.addRecipeBtn.isVisible()).to.be.true;
  });




});
