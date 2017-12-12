nationalQuiz.GameOverModalView = class {
  constructor(controller) {
    this.controller = controller;

    this.finalScore = document.getElementsByClassName('finalScore')[0];

    this.easyScoreList = document.getElementsByClassName('easyScore')[0];
    this.mediumScoreList = document.getElementsByClassName('mediumScore')[0];
    this.hardScoreList = document.getElementsByClassName('hardScore')[0];

    this.btnNewGame = document.getElementsByClassName('btnNewGame')[0];
    this.btnNewGame.addEventListener('click', this.startAgain()); // GAME OVER
  }

  startAgain() {

  }

  fillFinalScore() { // nie
              console.log('a');
    this.finalScore.innerText = this.controller.getUserData()[this.controller.getUserData().length - 1].score;
    this.drawTableOfResults();
  }

  drawTableOfResults() { // GAME OVER MODAL
    console.log('b');
    const levelTab = ['easyScore', 'mediumScore', 'hardScore'];
    let x = [];
    let results = ['', '', ''];

    let actualLevel = this.controller.getUserData()[this.controller.getUserData().length - 1].level;

    for (let i = 0; i <= 2; i++) {

      x[i] = this.controller.getUserData().filter(value => value.level === levelTab[i]); // POPRAWA
      console.log(x[2]);
      console.log(this.controller.getUserData());

      x[i].forEach(record => {
        results[i] += `<span>${record.name}: </span><span>${record.score}</span><span>${record.level}</span><br />`
      })
    }

    this.easyScoreList.innerHTML = results[0];
    this.mediumScoreList.innerHTML = results[1];
    this.hardScoreList.innerHTML = results[2];

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
}
