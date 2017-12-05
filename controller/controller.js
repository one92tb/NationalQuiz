nationalQuiz.Controller = class {

  initialize(model, countryNameView, flagView, chartsView, userView){
    this.model = model;
    this.countryNameView = countryNameView;
    this.flagView = flagView;
    this.chartsView = chartsView;
    this.userView = userView;
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
  save(obj){
    this.model.userData = obj;
  }
  addScore(score){
    this.model.updateUserScore(score);
  }
  removeScore(score){
    this.model.updateUserScore(score);
    this.userView.refreshUserData();
  }

  removeLife(){
    this.model.removeUserLife();
  }
  getUserData(){
    return this.model.userData;
  }
}
