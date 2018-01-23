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
  }
 // PROBLEM Z ZAPISEM OST WYNIKU
  fetchDataApi(level) {
    fetch('https://restcountries.eu/rest/v2/all')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        let country;
        let countryId;

        if (level === "easyScore") {
          country = data.filter(el => el.region === "Europe");
          countryId = Math.floor(Math.random() * (country.length-1)) + 1;
        } else if (level === "mediumScore") {
          country = data.filter(el => el.region === "Asia" || el.region === "Americas");
          countryId = Math.floor(Math.random() * (country.length-1)) + 1;
        } else {
          country = data.filter(el => el.region === "Africa" || el.region === "Oceania");
          countryId = Math.floor(Math.random() * (country.length-1)) + 1;
        }

        this.countryNameView.drawChartBoxes(country, countryId);
        this.flagView.drawFlag(country, countryId);
        this.chartsView.shuffle(country, countryId);
        this.countryNameView.shuffleEmptyDropZone();
      });
  }
  saveInitData(obj) {
    console.log(obj);
    this.model.userData = obj;
    this.userView.refreshUserData();
  }

  updateData(score, life, money) {
    this.model.updateUserData(score, life, money);
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
