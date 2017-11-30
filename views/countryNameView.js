nationalQuiz.CountryNameView = class {

  constructor(controller) {
    this.controller = controller;
    this.countryPlace = document.getElementsByClassName('countryPlace')[0];
    this.charts = document.getElementsByClassName('countryCharts')[0];


    document.addEventListener('drag', this.drag);
    document.addEventListener('dragstart', this.dragStart.bind(this));
    document.addEventListener('dragend', this.dragEnd.bind(this));
    document.addEventListener('dragover', this.dragOver.bind(this));
    document.addEventListener('drop', this.drop.bind(this));
    
  }

  drawChartBoxes(data, countryId) {
    let countryCharts = '';

    for (let i = 0; i < data[countryId].name.length; i++) {
      if (data[countryId].name[i] !== ' ') {
        countryCharts += `<div class="dropzone" draggable="false"></div>`
      }else{
        countryCharts += `<div class="hideEmptySpace dropzone" draggable="false">YY</div>`
      }
    }
    this.countryPlace.innerHTML = countryCharts;
    //  this.removeEmptyFields();
  }
  matchCountry() {

    let checkResult = Array.from(this.countryPlace.children).every(child => child.children[0] !== undefined);
    let result = '';

    if (checkResult === true) {
      for (let i = 0; i < this.country.length; i++) { // concat string, this is our result
        result += `${this.countryPlace.children[i].children[0].innerText}`;
      }

      if (result === this.country) { // compare result with country name
        this.setBackgroundLetter('green');
      } else {
        this.setBackgroundLetter('red');
      }
    } else {
      this.setBackgroundLetter('white');
    }
  }

  setBackgroundLetter(color) {
    for (let i = 0; i < this.countryPlace.children.length; i++) {
      this.countryPlace.children[i].style.background = color;
    }
  }

  drag() {}

  dragStart() {
    this.dragged = event.target;
    event.target.style.opacity = .5;
  }

  dragEnd() {
    event.target.style.opacity = "";
  }

  dragOver() {
    event.preventDefault();
  }

  dragLeave() {
    if (event.target.className == "dropzone") {
      event.target.style.background = "";
    }
  }

  drop() {
    event.preventDefault();

    if (event.target.className == "dropzone") {
      event.target.style.background = "";
      this.dragged.parentNode.removeChild(this.dragged);
      event.target.appendChild(this.dragged);
    }
    this.matchCountry();
  }
}
