nationalQuiz.CountryNameView = class {

  constructor(controller) {
    this.controller = controller;
    this.counter = 0;

    this.countryPlace = document.getElementsByClassName('countryPlace')[0];
    this.charts = document.getElementsByClassName('countryChart');
    this.chartZone = document.getElementsByClassName('ChartsZone');


    this.successModal = '#successModal';
    this.failModal = '#failModal';
    this.gameOverModal = '#gameOverModal';
    this.blinkTable = [];



    for (let i = 0; i < 2; i++) {
      this.chartZone[i].addEventListener('drop', this.drop.bind(this));
      this.chartZone[i].addEventListener('dragstart', this.dragStart.bind(this));
      this.chartZone[i].addEventListener('drag', this.drag);
      this.chartZone[i].addEventListener('dragend', this.dragEnd.bind(this));
      this.chartZone[i].addEventListener('dragover', this.dragOver.bind(this));
      this.chartZone[i].addEventListener('dragenter', this.dragEnter());
      this.chartZone[i].addEventListener('dragleave', this.dragLeave());
    }


  }

  drawChartBoxes(data, countryId) {

    this.countrySplit = data[countryId].name
      .split(' ')
      .map(letter => letter.split(''));

    this.countryAnswer = this.countrySplit
      .map(word => word.join(''))
      .join('');

    let countryPartOfName = '';
    let dropzoneId = 0;

    this.countrySplit.forEach((countryPart, id) => {
      let countryLetterBox = '';
      countryPart.forEach((letter, id) => {
        countryLetterBox += `<div class="dropzone countryLetterBox${dropzoneId} letterSlot" draggable="false"></div>`;
        dropzoneId++;
      })
      countryPartOfName += `<div class="countryPartDiv countryPartBox${id}">${countryLetterBox}</div>`;
    });

    this.countryPlace.innerHTML = countryPartOfName;
    this.country = data[countryId].name;
  }

  matchCountry() {

    this.countryLetterSlots = Array.from(document.getElementsByClassName('letterSlot'));
    this.countryName = '';
    let AnswerIsComplete = this.countryLetterSlots.every(child => child.children[0] && child.children[0].tagName === 'DIV' && child.children[0].classList.contains('countryChart'));
    let ourAnswer = '';
    // Answer from API
    this.country.split('').forEach(letter => {
      if (letter !== ' ') {
        this.countryName += letter;
      }
    })

    // ourAnswer
    if (AnswerIsComplete === true) {

      Array.from(this.countryLetterSlots).forEach(countryLetterSlot => {
        if (countryLetterSlot.children[0].tagName === 'DIV') {
          ourAnswer += `${countryLetterSlot.children[0].children[0].innerText}`;
        }
      });

      if (this.countryName === ourAnswer) { // compare result with country name
        this.setBackgroundLetter('green');
        this.controller.updateData(100, 0, 100);
        window.addEventListener('load', this.controller.showModal(this.successModal));
      } else {
        this.setBackgroundLetter('red');
        this.controller.updateData(0, -1, 0);
        if (this.controller.getUserData().reduce((prev, current) => (prev.id > current.id) ? prev : current).life < 1) {
          this.controller.createFinalScore(); // change color to white, when checkResult is false;
          window.addEventListener('load', this.controller.showModal(this.gameOverModal));
          this.controller.startHideUserWithoutScoreAndMarkLastScore();
        } else {
          window.addEventListener('load', this.controller.showModal(this.failModal));
        }
      }
    } else {
      this.setBackgroundLetter('white');
    }
  }

  setBackgroundLetter(color) {
    Array.from(this.countryLetterSlots).forEach(countryLetterSlot => {
      countryLetterSlot.style.background = color;
    })
  }

  shuffleEmptyDropZone() {

    this.AllBoxesCheckToHint = Array.from(document.getElementsByClassName('letterSlot'));
    let EmptyBoxesReadyToHint = this.AllBoxesCheckToHint.filter(box => box.children[0] === undefined);
    let EmptyBoxesLength = EmptyBoxesReadyToHint.length;
    let shuffleBoxesPosition = 0;
    this.shuffleBoxes = [];

    while (EmptyBoxesLength--) {
      shuffleBoxesPosition = Math.floor(Math.random() * (EmptyBoxesLength + 0));
      this.shuffleBoxes.push(EmptyBoxesReadyToHint[shuffleBoxesPosition]);
      EmptyBoxesReadyToHint.splice(shuffleBoxesPosition, 1);
    }
    //    console.log(this.counter);
    //    console.log(this.shuffleBoxes);

  }

  showHint() {
    // if all boxes are filled up
    console.log(this.counter);

    if (this.AllBoxesCheckToHint.every(box => box.children[0])) {
      null;
    } else {
      this.blinkId = Math.random().toString(36).slice(2, 16);

      let correctLetterId = parseInt(this.shuffleBoxes[this.counter].classList[1].match(/\d+/g));

      this.shuffleBoxes[this.counter].innerHTML = `<blink class="countryChart" id=${this.blinkId} draggable="false"><span  class="letters">${this.countryAnswer[correctLetterId]}</span></blink>`; //literka

      (this.counter + 1 >= this.shuffleBoxes.length) ? this.counter = 0: this.counter++;

      console.log(this.counter, this.shuffleBoxes);

      this.blinkTable.push(this.blinkId);

      this.controller.updateData(0, 0, -100);
      setTimeout(this.removeHint.bind(this), 10000);
    }
  }

  removeHint() {

    this.AllBoxesCheckToHint.forEach(box => {
      if (box.children[0] && box.children[0].id === this.blinkTable[0]) {
        box.children[0].remove();
      }
    })

    this.blinkTable.shift();

    if (this.counter >= this.shuffleBoxes.length) {
      this.counter = 0;
    }

    this.shuffleEmptyDropZone();
  }

  showCountryHint() {

    console.log(this.countryAnswer);

    if (Array.from(this.AllBoxesCheckToHint).every(child => child.children[0])) {
      null;
    } else {
      this.controller.updateData(0, 0, -1000);

      this.AllBoxesCheckToHint.forEach((record, id) => {
        if (record.children[0] && record.children[0].tagName === 'DIV') {
          this.controller.sendDroppeedLetter({
            id: record.children[0].classList[1].match(/\d+/g)[0],
            letter: record.children[0].children[0].innerText
          })
        }
      });

      this.AllBoxesCheckToHint.forEach((record, id) => {
        record.innerHTML = `<blink class="countryChart" draggable="false"><span  class="letters">${this.countryAnswer[id]}</span></blink>`;
      })

      setTimeout(this.removeShowCountry.bind(this), 10000);
    }
  }

  removeShowCountry() {
    this.AllBoxesCheckToHint.forEach((record, id) => {
      if (record.children[0].tagName === "BLINK") {
        record.children[0].remove();
      }
    })
  }

  drag(event) {

  }

  dragStart() {

    if (event.target.classList.contains('countryChart')) {
      null;
    } else {
      event.preventDefault();
    }
    //  (event.target.classList.contains('countryChart')) ? null: event.preventDefault();
    //  (event.target.classList.contains('chartZone')) ? event.preventDefault(): null;

    console.log(event.target);
    this.dragged = event.target;
  }

  dragEnd() {}

  dragOver() {
    event.preventDefault();
  }

  dragEnter() {}

  dragLeave() {}

  drop() {

    event.preventDefault();

    if (event.target.parentNode.tagName === "BLINK") {
      let actualBoxId = event.target.parentNode.parentNode.classList[1].match(/\d+/g)[0];
      if (event.target.parentNode.id) {
        this.blinkTable.filter((element, id) => (event.target.parentNode.id === element) ? this.blinkTable.splice(id, 1) : null);
      }
      event.target.parentNode.remove();
      this.dragged.parentNode.removeChild(this.dragged);
      this.AllBoxesCheckToHint[actualBoxId].appendChild(this.dragged);
      if (this.counter > 1) {
        this.counter--;
      }
    } else if (event.target.classList.contains('dropzone') && !event.target.children[0] && this.dragged.classList.contains('countryChart')) {
      event.target.style.background = "";
      this.dragged.parentNode.removeChild(this.dragged);
      event.target.appendChild(this.dragged);
    } else {
      console.log('aaa');
      return false;
    }

    this.matchCountry();
    this.shuffleEmptyDropZone();
    this.dragged = undefined;
  }
}
