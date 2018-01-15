nationalQuiz.SuccessModalView = class {
    constructor(controller) {
        this.controller = controller;
        this.btnGoodAnswer = document.getElementsByClassName('btnGoodAnswer')[0];
        this.btnGoodAnswer.addEventListener('click', this.goodAnswer.bind(this));

        this.btnRestartGame = document.getElementsByClassName('btnFinishSuccess')[0];

        this.btnRestartGame.addEventListener('click', this.restartGame.bind(this));
    }

    goodAnswer() {
        this.controller.fetchDataApi();
    }
    restartGame() {
        this.controller.createFinalScore();
        this.controller.showModal('#gameOverModal');
    }
}
