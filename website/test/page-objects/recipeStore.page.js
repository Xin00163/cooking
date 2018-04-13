class RecipeStore {
    get backToSearchBtn() { return $('a[href="/"]');}
    get recipeName() { return $('#inputRecipeName');}
    get cookingTime() { return $('#inputCookingTime');}
    get addRecipeBtn() { return $('#btnAddRecipe');}
}

export default new RecipeStore();
