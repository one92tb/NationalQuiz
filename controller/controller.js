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

  fetchDataApi(level) {
    fetch('https://restcountries.eu/rest/v2/all')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        let country;
        let countryId;

        if (level === "easy") {
          country = data.filter(el => el.region === "Europe");
          countryId = Math.floor(Math.random() * country.length) + 1;
          console.log(country);
        } else if (level === "medium") {
          country = data.filter(el => el.region === "Asia" || el.region === "Americas");
          countryId = Math.floor(Math.random() * country.length) + 1;
          console.log(country);
        } else {
          country = data.filter(el => el.region === "Africa" || el.region === "Oceania");
          countryId = Math.floor(Math.random() * country.length) + 1;
          console.log(country);
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

  updateData(score, life) {
    this.model.updateUserData(score, life);
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
