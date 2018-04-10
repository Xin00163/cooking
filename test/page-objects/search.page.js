class Search {
    get searchBtn() { return $('.btn.btn-lg.btn-primary.search');}
    get inputTextBox() { return '#inputSearchQuery';}
    get recipe() { return $('#results'); }
}

export default new Search();
