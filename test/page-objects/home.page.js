class HomePage  {
    get cookbook() { return $('a[href="#"]')};
    get recipeStore() { return $('a[href="/recipeStore"]')};

}

export default new HomePage();
