nationalQuiz.GameOverModalView = class {
  constructor(controller) {
    this.controller = controller;

    this.finalScore = document.getElementsByClassName('finalScore')[0];

    this.easyScoreList = document.getElementsByClassName('easyScore')[0];
    this.mediumScoreList = document.getElementsByClassName('mediumScore')[0];
    this.hardScoreList = document.getElementsByClassName('hardScore')[0];

    this.btnNewGame = document.getElementsByClassName('btnNewGame')[0];
    this.btnNewGame.addEventListener('click', this.startAgain); // GAME OVER
  }

  startAgain() {
    location.reload();
  }

  fillFinalScore() { // nie
    console.log('a');
    this.finalScore.innerText = this.controller.getUserData()[this.controller.getUserData().length - 1].score;
    this.drawTableOfResults();
  }

  drawTableOfResults() { // GAME OVER MODAL
    const levelTab = ['easyScore', 'mediumScore', 'hardScore'];
    let x = [];
    let results = ['', '', ''];

    let actualLevel = this.controller.getUserData()[this.controller.getUserData().length - 1].level;

    for (let i = 0; i <= 2; i++) {

      x[i] = this.controller.getUserData().filter(value => value.level === levelTab[i]); // POPRAWA

      x[i].forEach((record, id) => {
        results[i] += `<tr class ="rowResult">
                    <td><span>${id+1}</span></td>
                    <td><span>${record.name}</span></td>
                    <td><span>${record.score}</span></td>
                 </tr>`
      })
    }

    this.easyScoreList.innerHTML = results[0];
    this.mediumScoreList.innerHTML = results[1];
    this.hardScoreList.innerHTML = results[2];

    if (actualLevel === 'easyScore') {
      document.getElementsByClassName('easyCard')[0].parentNode.classList.add('show');
    } else if (actualLevel === 'mediumScore') {
      document.getElementsByClassName('mediumCard')[0].parentNode.classList.add('show');
    } else if (actualLevel === 'hardScore') {
      document.getElementsByClassName('hardCard')[0].parentNode.classList.add('show');
    }
  }
}
