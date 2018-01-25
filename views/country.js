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


    document.addEventListener('drop', this.drop.bind(this));
    document.addEventListener('dragstart', this.dragStart.bind(this));
    document.addEventListener('drag', this.drag);
    document.addEventListener('dragend', this.dragEnd.bind(this));
    document.addEventListener('dragover', this.dragOver.bind(this));
    document.addEventListener('dragenter', this.dragEnter());
    document.addEventListener('dragleave', this.dragLeave());

  }

  drawChartBoxes(data, countryId) {

    let countrySplit = data[countryId].name
      .split(' ')
      .map(letter => letter.split(''));

    let countryPartOfName = '';

    countrySplit.forEach((countryPart, id) => {
      let countryLetterBox = '';
      countryPart.forEach((letter, id) => {
        countryLetterBox += `<div class="dropzone countryLetterBox${id} letterSlot" draggable="false"></div>`;
      })
      countryPartOfName += `<div class="countryPartDiv countryPartBox${id}">${countryLetterBox}</div>`;
    });

    this.countryPlace.innerHTML = countryPartOfName;
    this.country = data[countryId].name;
  }

  matchCountry() {

    this.countryLetterSlots = Array.from(document.getElementsByClassName('letterSlot'));
    let AnswerIsComplete = this.countryLetterSlots.every(child => child.children[0] && child.children[0].tagName === 'DIV' && child.children[0].classList.contains('countryChart'));
    let countryName = '';
    let ourAnswer = '';
    // Answer from API
    this.country.split('').forEach(letter => {
      if (letter !== ' ') {
        countryName += letter;
      }
    })

    // ourAnswer
    if (AnswerIsComplete === true) {

      Array.from(this.countryLetterSlots).forEach(countryLetterSlot => {
        if (countryLetterSlot.children[0].tagName === 'DIV') {
          ourAnswer += `${countryLetterSlot.children[0].children[0].innerText}`;
        }
      });

      if (countryName === ourAnswer) { // compare result with country name
        console.log(this);
        this.setBackgroundLetter('green');
        this.controller.updateData(100, 0, 100);
        window.addEventListener('load', this.controller.showModal(this.successModal));
      } else {
        this.setBackgroundLetter('red');
        this.controller.updateData(0, -1, 0);
        if (this.controller.getUserData().reduce((prev, current) => (prev.id > current.id) ? prev : current).life < 1) {
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
    Array.from(this.countryLetterSlots).forEach(countryLetterSlot => {
      countryLetterSlot.style.background = color;
    })
  }


  /*
  Array.from(this.countryLetterSlots).forEach(countryLetterSlot => {
    console.log(countryLetterSlot);

  })*/

  /*if (!node.classList.contains('hideEmptySpace')) {
    result += `${node.children[0].children[0].innerText}`;
  }*/



  /*  Array.from(this.countryPlace.children).forEach(node => {
        console.log(node);
      });

      let onlyVisibleLetter = Array.from(this.countryPlace.children).filter(child => (!child.classList.contains('hideEmptySpace') ? child : null)); // niepotrzebne
      let checkResult = onlyVisibleLetter.every(child => child.children[0] && child.children[0].tagName === 'DIV' && child.children[0].classList.contains('countryChart'));





      let countryName = '';

      this.country.split('').forEach(letter => { // SKLEJAM ODP Z API BEZ SPACJI
        if (letter !== ' ') {
          countryName += letter;
        }
      })


      if (checkResult === true) { // sprawdzam czy wszystkie pola sa pelne

        let result = '';

        Array.from(this.countryPlace.children).forEach(node => { // TWORZE WYNIK ODPOWIADAJACEGO
          if (!node.classList.contains('hideEmptySpace')) {
            result += `${node.children[0].children[0].innerText}`;
          }
        });

        // POROWNANIE
*/






  // #################################################

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
  }

  showHint() { // problem !!! problem jest z nr counter
    if (Array.from(this.countryPlace.children).every(child => child.children[0])) {
      null;
    } else {
      this.blinkId = Math.random().toString(36).slice(2, 16);

      this.dropzoneDivs[this.counter].innerHTML = `<blink class="countryChart" id=${this.blinkId} draggable="false"><span  class="letters">${this.letters[this.dropzoneDivs[this.counter].id]}</span></blink>`;
      this.blinkingDivId = Array.from(this.dropzoneDivs)[this.counter].id;

      if (this.counter === this.dropzoneDivs.length + 1) {
        this.counter = 0;
      } else {
        this.counter++;
      }

      this.blinkTable.push(this.blinkId);
      this.controller.updateData(0, 0, -100);
      setTimeout(this.removeHint.bind(this), 10000);
    }
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
    if (Array.from(this.countryPlace.children).every(child => child.children[0])) {
      null;
    } else {
      this.controller.updateData(0, 0, -1000);

      Array.from(this.countryPlace.children).forEach((record, id) => {
        if (record.children[0] && record.children[0].tagName === 'DIV') {
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
  }

  removeShowCountry() {
    Array.from(this.countryPlace.children).forEach((record, id) => {
      if (record.children[0].tagName === "BLINK") {
        record.children[0].remove();
      }
    })

  }







  drag(event) {}

  dragStart() {
    if (!event.target.classList.contains('countryChart') || event.target === undefined) {
      event.preventDefault();
    }
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


    let replaceLetterId = event.target.parentNode.parentNode.id;

    /*  if (event.target.parentNode.tagName === "BLINK") {
        if (event.target.parentNode.id) {
          this.blinkTable.filter((element, id) => (event.target.parentNode.id === element) ? this.blinkTable.splice(id, 1) : null);
        }
        event.target.parentNode.remove();
        this.dragged.parentNode.removeChild(this.dragged);
        this.countryPlace.children[replaceLetterId].appendChild(this.dragged);
      } else*/
    if (event.target.classList.contains('dropzone') && !event.target.children[0]) {
      event.target.style.background = "";
      this.dragged.parentNode.removeChild(this.dragged);
      event.target.appendChild(this.dragged);
    } else {
      return false;
    }

    this.matchCountry();
    //  this.shuffleEmptyDropZone();
    //this.dragged = undefined;
  }
}
