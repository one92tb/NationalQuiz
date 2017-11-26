nationalQuiz.ChartsView = class {
  constructor(controller) {
    this.controller = controller;
    this.charts = document.getElementById('charts');
    this.result = [];
    this.countryPlace = document.getElementById('countryPlace');

    document.addEventListener('drag', this.drag);
    document.addEventListener('dragstart', this.dragStart.bind(this));
    document.addEventListener('dragend', this.dragEnd.bind(this));
    document.addEventListener('dragover', this.dragOver.bind(this));
    document.addEventListener('drop', this.drop.bind(this));
  }


  drawCharts(tableLetters) {
    let countryCharts = '';

    for (let i = 0; i < tableLetters.length; i++) {
      countryCharts += `
      <div class ="dropzone" id="dropzone">
        <div class="countryChart draggable="true" draggable="true"><span class="letters">${tableLetters[i]}</span></div>
      </div>
      `
    }
    this.charts.innerHTML = countryCharts;
  }

  shuffle(data, countryId) {

    this.country = data[countryId].name;
    this.tableLetters = this.country.split('');

    for (let i = this.tableLetters.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.tableLetters[i], this.tableLetters[j]] = [this.tableLetters[j], this.tableLetters[i]];
    }
    this.drawCharts(this.tableLetters);
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

    // move dragged elem to the selected drop target
    if (event.target.className == "dropzone") {
      event.target.style.background = "";
      this.dragged.parentNode.removeChild(this.dragged);
      event.target.appendChild(this.dragged);
    }
    this.matchCountry();
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
}
