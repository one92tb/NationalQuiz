nationalQuiz.FailModalView = class {
    constructor(controller) {
        this.controller = controller;
        //this.btnWrongAnswer = document.getElementsByClassName('btnWrongAnswer')[0];
        this.btnRestartGame = document.getElementsByClassName('btnFinishFail')[0];

      //  this.btnWrongAnswer.addEventListener('click', this.removeLife.bind(this));
        this.btnRestartGame.addEventListener('click', this.restartGame.bind(this));

    }

    restartGame() {
        this.controller.createFinalScore();
        this.controller.showModal('#gameOverModal');
    }
}
