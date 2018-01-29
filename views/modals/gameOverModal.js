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

  fillFinalScore() {
    console.log('a');
    this.lastObj = this.controller.getUserData().reduce((prev, current) => (prev.id > current.id) ? prev : current);
    this.finalScore.innerText = this.lastObj.score;
    this.drawTableOfResults();
  }

  drawTableOfResults() {
    const levelTab = ['easyScore', 'mediumScore', 'hardScore'];
    let x = [];
    let results = ['', '', ''];

    let actualLevel = this.lastObj.level;

    for (let i = 0; i <= 2; i++) {

      x[i] = this.controller.getUserData().filter(value => value.level === levelTab[i]); // POPRAWA

      x[i].forEach((record, id) => {
        results[i] += `<tr class ="rowResult ${record.id}">
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
  hideUserWithoutScoreAndMarkLastScore() {
    this.ourResults = Array.from(document.getElementsByClassName('rowResult'));
    console.log(typeof(this.lastObj.id));

    this.ourResults.forEach(tr => {
      if (parseInt(tr.classList[1]) === this.lastObj.id) {
        console.log(tr, tr.classList[1], this.lastObj.id)
        tr.classList.add('lastScore');
      } else {
        console.log(tr, tr.classList[1], this.lastObj.id)
        if (tr.classList.contains('lastScore')) {
          tr.classList.remove('lastScore');
        }
      }
    });


    let tableRowToHide = this.ourResults.filter(tr => parseInt(tr.children[2].innerText) === 0);
    tableRowToHide.forEach(tr => tr.classList.add('hideElement'));

  }
}
