nationalQuiz.CountryNameView = class {

  constructor(controller) {
    this.controller = controller;

    this.counter = 0;

    this.countryPlace = document.getElementsByClassName('countryPlace')[0];
    this.charts = document.getElementsByClassName('countryCharts')[0];
    this.finalScore = document.getElementsByClassName('finalScore')[0];

    this.btnHint = document.getElementsByClassName('btnHint')[0];
    this.btnShowCountry = document.getElementsByClassName('btnShowCountry')[0];

    this.btnHint.addEventListener('click', this.hint.bind(this));
    this.btnShowCountry.addEventListener('click', this.showCountry.bind(this));

    this.easyScoreList = document.getElementsByClassName('easyScore')[0];
    this.mediumScoreList = document.getElementsByClassName('mediumScore')[0];
    this.hardScoreList = document.getElementsByClassName('hardScore')[0];

    this.chart = document.getElementsByClassName('letters')[0];

    document.addEventListener('drag', this.drag);
    document.addEventListener('dragstart', this.dragStart.bind(this));
    document.addEventListener('dragend', this.dragEnd.bind(this));
    document.addEventListener('dragover', this.dragOver.bind(this));
    document.addEventListener('drop', this.drop.bind(this));

    this.successModal = '#successModal';
    this.failModal = '#failModal';
    this.gameOverModal = '#gameOverModal';
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

    let checkResult = Array.from(this.countryPlace.children).every(child => child.children[0] !== undefined);
    let result = '';

    if (checkResult === true) {
      for (let i = 0; i < this.country.length; i++) { // concat string, this is our result
        result += `${this.countryPlace.children[i].children[0].innerText}`;
      }
      if (result === this.country) { // compare result with country name
        this.setBackgroundLetter('green');
        this.controller.addScore(100);
        window.addEventListener('load', this.showModal(this.successModal));
      } else {
        this.setBackgroundLetter('red');
        this.controller.removeLife();
        if (this.controller.getUserData()[this.controller.getUserData().length - 1].life < 1) {
          this.fillFinalScore();
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

  nextCountry() {
    this.controller.fetchDataApi();
  }

  fillFinalScore() {
    this.finalScore.innerText = this.controller.getUserData()[this.controller.getUserData().length - 1].score;
    this.drawTableOfResults();
  }

  drawTableOfResults() {

    const levelTab = ['easyScore', 'mediumScore', 'hardScore'];
    let x = [];
    let results = ['', '', ''];

    let actualLevel = this.controller.getUserData()[this.controller.getUserData().length - 1].level;

    for (let i = 0; i < 2; i++) {

      x[i] = this.controller.getUserData().filter(value => value.level === levelTab[i]);

      x[i].forEach(record => {
        results[i] += `<span>${record.name}: </span><span>${record.score}</span><br />`
      })

      this.easyScoreList.innerHTML = results[i];
      this.mediumScoreList.innerHTML = results[i];
      this.hardScoreList.innerHTML = results[i];
    }

    if (actualLevel === 'easyScore') {
      //  this.easyScore.innerHTML = results;
      document.getElementsByClassName('easyScore')[0].parentNode.classList.add('show');
    } else if (actualLevel === 'mediumScore') {
      //    this.mediumScore.innerHTML = results;
      document.getElementsByClassName('mediumScore')[0].parentNode.classList.add('show');
    } else {
      //      this.hardScore.innerHTML = results;
      document.getElementsByClassName('hardScore')[0].parentNode.classList.add('show');
    }
  }

  shuffleEmptyDropZone() {
    this.Letters = this.country.split('');
    console.log(this.Letters);
    this.EmptyDropzoneToHint = Array.from(this.countryPlace.children).filter(children => children.children[0] === undefined && children.classList.contains('hideEmptySpace') === false);
    this.dropzoneDivs = []; // here We have random letters, example 'cuba' - > 'c','a','b','u'
    let a = this.EmptyDropzoneToHint.length;
    let b = 0;
    console.log(this.counter);

    while (a--) {
      b = Math.floor(Math.random() * (a + 0));
      this.dropzoneDivs.push(this.EmptyDropzoneToHint[b]);
      console.log(b);
      this.EmptyDropzoneToHint.splice(b, 1);
    }
  }

  hint() {

    console.log(this.dropzoneDivs[this.counter].id);
    this.counterQueue = [];
    this.counterQueue.push(this.dropzoneDivs[this.counter].id);

    this.dropzoneDivs[this.counter].innerHTML = `<blink class="countryChart" draggable="false"><span  class="letters">${this.Letters[this.dropzoneDivs[this.counter].id]}</blink>`
    console.log(this.dropzoneDivs[this.counter].children[0]);

    this.counter++;

    if (this.counter === this.dropzoneDivs.length) { // zeruje liczenie
      this.counter = 0;
    }


    this.controller.removeScore(-100);
    setTimeout(this.removeBlinkElement.bind(this), 3000);
  }

  removeBlinkElement() {


    console.log(this.counterQueue);
    //  this.dropzoneDivs[counterQueue[counterQueue.length-1]].children[0].remove(); // blad

  }

  showCountry() {
    console.log(this.Letters);

    Array.from(this.countryPlace.children).forEach((record, id) => {
      record.innerHTML = `<blink class="countryChart" draggable="false"><span  class="letters">${this.Letters[id]}</span></blink>`;
    })
    setTimeout(this.removeShowCountry.bind(this), 4000);
  }


  removeShowCountry() {
    Array.from(this.countryPlace.children).forEach((record, id) => {
      record.children[0].remove();
    })
  }


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
