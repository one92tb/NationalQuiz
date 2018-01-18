nationalQuiz.Controller = class {

  initialize(model, countryNameView, flagView, chartsView, userView, initModalView, successModalView, failModalView, gameOverModalView) {
    this.model = model;
    this.countryNameView = countryNameView;
    this.flagView = flagView;
    this.chartsView = chartsView;
    this.userView = userView;
    this.initModalView = initModalView;
    this.successModalView = successModalView;
    this.failModalView = failModalView;
    this.gameOverModalView = gameOverModalView;

    this.fetchDataApi();
  }

  fetchDataApi() {
    fetch('https://restcountries.eu/rest/v2/all')
      .then(response => response.json())
      .then(data => {
        const countryId = Math.floor(Math.random() * 250) + 1;
        this.countryNameView.drawChartBoxes(data, countryId);
        this.flagView.drawFlag(data, countryId);
        this.chartsView.shuffle(data, countryId);
        this.countryNameView.shuffleEmptyDropZone();
      });
  }
  save(obj) {
    this.model.userData = obj;
    this.userView.refreshUserData();
  }
  updateScore(score) {
    this.model.updateUserScore(score);
    this.userView.refreshUserData();
  }

  updateLife(life) {
    this.model.removeUserLife(life);
    this.userView.refreshUserData();
  }
  getUserData() {
    return this.model.userData;
  }

  handleHint() {
    this.countryNameView.showHint();
  }
  handleCountryHint() {
    this.countryNameView.showCountryHint();
  }
  createFinalScore() {
    this.gameOverModalView.fillFinalScore();
  }
  sendDroppeedLetter(obj) {
    this.model.countryLetter = obj;
    this.chartsView.restoreCharts();
  }
  getDroppedLetter() {
    return this.model.countryLetter;
  }
  clearLettersTable() {
    this.model.clearLettersTable();
  }

  showModal(modalId) {
    $(modalId).modal({
      backdrop: 'static',
      keyboard: false
    })
  }
}
