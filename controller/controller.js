nationalQuiz.Controller = class {

  initialize(countryNameView, flagView, chartsView){
    this.countryNameView = countryNameView;
    this.flagView = flagView;
    this.chartsView = chartsView;
    this.fetchDataApi();
  }

  fetchDataApi() {
    fetch('https://restcountries.eu/rest/v2/all')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        const countryId = Math.floor(Math.random() * 250) + 1;
        this.countryNameView.drawChartBoxes(data, countryId);
        this.flagView.drawFlag(data, countryId);
        this.chartsView.shuffle(data, countryId);
      });
  }
}
