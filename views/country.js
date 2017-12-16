nationalQuiz.CountryNameView = class {

  constructor(controller) {
    this.controller = controller;
    this.counter = 0;

    this.countryPlace = document.getElementsByClassName('countryPlace')[0];

    this.charts = document.getElementsByClassName('countryChart');

    document.addEventListener('drop', this.drop.bind(this));
    document.addEventListener('dragstart', this.dragStart.bind(this));
    document.addEventListener('drag', this.drag);
    document.addEventListener('dragend', this.dragEnd.bind(this));
    document.addEventListener('dragover', this.dragOver.bind(this));
    document.addEventListener('dragenter', this.dragEnter());
    document.addEventListener('dragleave', this.dragLeave());
    document.addEventListener('mouseover', this.test.bind(this));

    this.successModal = '#successModal';
    this.failModal = '#failModal';
    this.gameOverModal = '#gameOverModal';
  }

  setDragable() {
    Array.from(document.getElementsByClassName('countryChart')).forEach(element => {
      element.setAttribute("onmousedown", "return false");
    })
  }

  test(event){
    if (!event.target.classList.contains('countryChart')) {
      event.target.setAttribute("onmousedown", "return false");
    } else {
      return false;
    }
  }
  /*
    console.log(event.target);
    if (!event.target.classList.contains('countryChart')) {
      event.target.setAttribute("onmousedown", "return false");
    } else {
      return true;
    }*/


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

    let checkResult = Array.from(this.countryPlace.children).every(child => child.children[0] !== undefined);
    let result = '';

    if (checkResult === true) {
      for (let i = 0; i < this.country.length; i++) { // concat string, this is our result
        result += `${this.countryPlace.children[i].children[0].innerText}`;
      }
      if (result === this.country) { // compare result with country name
        this.setBackgroundLetter('green');
        this.controller.updateScore(100);
        window.addEventListener('load', this.showModal(this.successModal));
      } else {
        this.setBackgroundLetter('red');
        this.controller.updateLife(-1);
        if (this.controller.getUserData()[this.controller.getUserData().length - 1].life < 1) {
          this.controller.createFinalScore();
          window.addEventListener('load', this.showModal(this.gameOverModal));
        } else {
          window.addEventListener('load', this.showModal(this.failModal));
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

  showModal(modalId) {
    $(modalId).modal('show');
  }

  shuffleEmptyDropZone() {
    this.letters = this.country.split('');
    console.log(this.Letters);
    this.EmptyDropzoneToHint = Array.from(this.countryPlace.children).filter(children => children.children[0] === undefined && children.classList.contains('hideEmptySpace') === false);
    this.dropzoneDivs = []; // here We have random letters, example 'cuba' - > 'c','a','b','u'
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
    this.dropzoneDivs[this.counter].innerHTML = `<blink class="countryChart" draggable="false"><span  class="letters">${this.letters[this.dropzoneDivs[this.counter].id]}</blink>`
    this.controller.updateScore(-100);
    setTimeout(this.removeHint.bind(this), 1000);
  }

  removeHint() {
    this.blinkingDivId = Array.from(this.dropzoneDivs)[this.counter].id;
    this.blinkingElement = document.getElementById(this.blinkingDivId);
    this.blinkingElement.children[0].remove();
    this.counter++;
    if (this.counter === this.dropzoneDivs.length) { // zeruje liczenie
      this.counter = 0;
    }
  }

  showCountryHint() {
    console.log(this.letters);

    Array.from(this.countryPlace.children).forEach((record, id) => {
      record.innerHTML = `<blink class="countryChart" draggable="false"><span  class="letters">${this.letters[id]}</span></blink>`;
    })
    setTimeout(this.removeShowCountry.bind(this), 5000);
  }


  removeShowCountry() {
    Array.from(this.countryPlace.children).forEach((record, id) => {
      record.children[0].remove();
    })
  }

  drag() {
    console.log('drag')
    return false;
  }

  dragStart() {
    this.dragged = event.target;
    console.log(this.dragged);

    if (!this.dragged.classList.contains('countryChart')) {
      this.dragged.setAttribute("onmousedown", "return false");
    } else {
      return true;
    }
  }

  dragEnd() {
    console.log('dragend');
  }

  dragOver() {
    console.log('dragover');
    event.preventDefault();
    console.log(event.target);
  }

  dragEnter() {
    console.log('dragenter');
  }

  dragLeave() {
    console.log('dragleave');
  }

  drop() {
    console.log('drop');
    event.preventDefault();

    if (event.target.className === "dropzone" && this.dragged.classList.contains('countryChart')) {
      event.target.style.background = "";
      this.dragged.parentNode.removeChild(this.dragged);
      event.target.appendChild(this.dragged);
    }

    this.matchCountry();
    this.shuffleEmptyDropZone();
    this.dragged = undefined;
  }
}
