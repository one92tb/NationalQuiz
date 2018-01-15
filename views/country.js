nationalQuiz.CountryNameView = class {

  constructor(controller) {
    this.controller = controller;
    this.counter = 0;

    this.countryPlace = document.getElementsByClassName('countryPlace')[0];
    this.charts = document.getElementsByClassName('countryChart');
    this.chartZone = document.getElementsByClassName('ChartsZone');

    for (let i = 0; i <= 1; i++) {
      this.chartZone[i].addEventListener('drop', this.drop.bind(this));
      this.chartZone[i].addEventListener('dragstart', this.dragStart.bind(this));
      this.chartZone[i].addEventListener('drag', this.drag);
      this.chartZone[i].addEventListener('dragend', this.dragEnd.bind(this));
      this.chartZone[i].addEventListener('dragover', this.dragOver.bind(this));
      this.chartZone[i].addEventListener('dragenter', this.dragEnter());
      this.chartZone[i].addEventListener('dragleave', this.dragLeave());
    }

    this.successModal = '#successModal';
    this.failModal = '#failModal';
    this.gameOverModal = '#gameOverModal';
    this.blinkTable = [];
  }

  drawChartBoxes(data, countryId) {
    let countryCharts = '';
    this.country = data[countryId].name;

    for (let i = 0; i < data[countryId].name.length; i++) {
      if (data[countryId].name[i] !== ' ') {
        countryCharts += `<div class="dropzone" id ="${i}" draggable="false"></div>`
      } else {
        countryCharts += `<div class="hideEmptySpace dropzone" draggable="false"></div>`
      }
    }
    this.countryPlace.innerHTML = countryCharts;
  }

  matchCountry() {

    let checkResult = Array.from(this.countryPlace.children).every(child => child.children[0] && child.children[0].tagName === 'DIV' && child.children[0].classList.contains('countryChart'));
    console.log(Array.from(this.countryPlace.children).every(child => child.children[0] !== undefined && !child.children[0].classList.contains('countryChart'))); //error

    let result = '';


    if (checkResult === true) {
      for (let i = 0; i < this.country.length; i++) { // concat string, this is our result
        result += `${this.countryPlace.children[i].children[0].innerText}`;
      }
      if (result === this.country) { // compare result with country name
        console.log(this);
        this.setBackgroundLetter('green');
        this.controller.updateScore(100);
        window.addEventListener('load', this.controller.showModal(this.successModal));
      } else {
        this.setBackgroundLetter('red');
        this.controller.updateLife(-1);
        if (this.controller.getUserData()[this.controller.getUserData().length - 1].life < 1) {
          this.controller.createFinalScore(); // change color to white, when checkResult is false;
          window.addEventListener('load', this.controller.showModal(this.gameOverModal));
        } else {
          window.addEventListener('load', this.controller.showModal(this.failModal));
        }
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

  shuffleEmptyDropZone() {
    this.letters = this.country.split('');
    this.EmptyDropzoneToHint = Array.from(this.countryPlace.children).filter(children => children.children[0] === undefined && children.classList.contains('hideEmptySpace') === false);
    this.dropzoneDivs = [];
    let a = this.EmptyDropzoneToHint.length;
    let b = 0;

    while (a--) {
      b = Math.floor(Math.random() * (a + 0));
      this.dropzoneDivs.push(this.EmptyDropzoneToHint[b]);
      this.EmptyDropzoneToHint.splice(b, 1);
    }
    console.log(this.dropzoneDivs);
  }

  showHint() {

    this.blinkId = Math.random().toString(36).slice(2, 16);
    this.dropzoneDivs[this.counter].innerHTML = `<blink class="countryChart" id=${this.blinkId} draggable="false"><span  class="letters">${this.letters[this.dropzoneDivs[this.counter].id]}</span></blink>`;
    this.blinkingDivId = Array.from(this.dropzoneDivs)[this.counter].id;
    this.counter++;
    this.blinkTable.push(this.blinkId);
    this.controller.updateScore(-100);
    setTimeout(this.removeHint.bind(this), 10000);

  }

  removeHint() {

    Array.from(this.countryPlace.children).forEach((letter, id) => {
      if (letter.children[0] && letter.children[0].id === this.blinkId) {
        document.getElementById(this.blinkTable[0]).remove();
      };
    })

    this.blinkTable.shift();

    if (this.counter === this.dropzoneDivs.length) {
      this.counter = 0;
    }
  }

  showCountryHint() {

    this.controller.updateScore(-1000);

    // przywrocic do countrycharts
    Array.from(this.countryPlace.children).forEach((record, id) => {
      if (record.children[0] && record.children[0].tagName === 'DIV') {
        console.log(record.children[0].classList[1].match(/\d+/g)[0], record.children[0].children[0].innerText);
        this.controller.sendDroppeedLetter({
          id: record.children[0].classList[1].match(/\d+/g)[0],
          letter: record.children[0].children[0].innerText
        })
      }

    });

    Array.from(this.countryPlace.children).forEach((record, id) => {
      record.innerHTML = `<blink class="countryChart" draggable="false"><span  class="letters">${this.letters[id]}</span></blink>`;
    })

    setTimeout(this.removeShowCountry.bind(this), 10000);
  }

  removeShowCountry() {
    Array.from(this.countryPlace.children).forEach((record, id) => {
      if (record.children[0].tagName === "BLINK") {
        record.children[0].remove();
      }
    })

  }

  drag(event) {

  }

  dragStart() {
    this.dragged = event.target;

  }

  dragEnd() {

  }

  dragOver() {
    event.preventDefault();
  }

  dragEnter() {

  }

  dragLeave() {

  }

  drop() {

    event.preventDefault();
    let replaceLetterId = event.target.parentNode.parentNode.id;

    if (event.target.parentNode.tagName === "BLINK") {
      if (event.target.parentNode.id) {
        this.blinkTable.filter((element, id) => (event.target.parentNode.id === element) ? this.blinkTable.splice(id, 1) : null);
      }
      event.target.parentNode.remove();
      this.dragged.parentNode.removeChild(this.dragged);
      this.countryPlace.children[replaceLetterId].appendChild(this.dragged);
    } else if (event.target.className === "dropzone" && this.dragged.classList.contains('countryChart') && !event.target.children[0]) {
      event.target.style.background = "";
      this.dragged.parentNode.removeChild(this.dragged);
      event.target.appendChild(this.dragged);
    } else {
      return false;
    }

    this.matchCountry();
    this.shuffleEmptyDropZone();
    this.dragged = undefined;
  }


}
