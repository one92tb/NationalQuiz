nationalQuiz.FlagView = class {

  constructor(controller) {
    this.controller = controller;
    this.flag = document.getElementById('flag');
  }

  drawFlag(data, countryId) {
    let flagImg = `<img src="${data[countryId].flag}" height="100%" width="100%">`;
    this.flag.innerHTML = flagImg;
  }
}
