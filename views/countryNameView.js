nationalQuiz.CountryNameView = class {

  constructor(controller) {
    this.controller = controller;
    this.countryPlace = document.getElementById('countryPlace');
    this.flag = document.getElementById('flag');


  }

  drawChartBoxes(data, countryId) {
    let countryCharts = '';

    for (let i = 0; i < data[countryId].name.length; i++) {
      countryCharts += `<div class="dropzone"></div>`
    }
    this.countryPlace.innerHTML = countryCharts;
  //  this.removeEmptyFields();
  }



  /*removeEmptyFields() {
    Array.from(this.countryPlace.children).forEach(field => {
      if (field.innerText === '') {
        field.classList.add('hideEmptySpace');
      }
    });
  }*/


}
