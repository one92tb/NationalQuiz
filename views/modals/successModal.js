nationalQuiz.SuccessModalView = class {
  constructor(controller) {
    this.controller = controller;
    this.btnGoodAnswer = document.getElementsByClassName('btnGoodAnswer')[0];
    this.btnGoodAnswer.addEventListener('click', this.goodAnswer.bind(this));
  }

  goodAnswer() {
    this.controller.fetchDataApi();
  }
}
