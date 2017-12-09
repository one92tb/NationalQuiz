nationalQuiz.FailModalView = class {
  constructor(controller) {
    this.controller = controller;
    this.btnWrongAnswer = document.getElementsByClassName('btnWrongAnswer')[0];
    this.btnWrongAnswer.addEventListener('click', this.removeLife.bind(this));
  }
  removeLife(){
    this.controller.updateLife;
  }
}
