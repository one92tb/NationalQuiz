nationalQuiz.FailModalView = class {
  constructor(controller) {
    this.controller = controller;
    this.btnRestartGame = document.getElementsByClassName('btnFinishFail')[0]; // problem
    this.btnRestartGame.addEventListener('click', this.restartGame.bind(this));

  }
  //PROBLEM Z SORTOWANIEM
  restartGame() {
    this.controller.createFinalScore();
    this.controller.startHideUserWithoutScoreAndMarkLastScore();
    this.controller.showModal('#gameOverModal');
  }
}
