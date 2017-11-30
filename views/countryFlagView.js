nationalQuiz.FlagView = class {

  constructor(controller) {
    this.controller = controller;
    this.flag = document.getElementsByClassName('flag')[0];
  }

  drawFlag(data, countryId) {
    let flagImg = `<img src="${data[countryId].flag}"  height="170px" width="340px">`;
    this.flag.innerHTML = flagImg;
  }
}
