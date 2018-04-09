class HomePage  {
    get cookbook() { return $('a[href="#"]')};
    get recipeStore() { return $('a[href="/recipeStore"]')};
    get register() { return $('a[href="/register"]')};
}

export default new HomePage();
