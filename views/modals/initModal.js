nationalQuiz.InitModalView = class {
  constructor(controller) {

    this.controller = controller;
    this.userNameInput = document.getElementsByClassName('userNameInput')[0];

    this.easyButton = document.getElementsByClassName('btnModal')[0]; // panel user - update po odp
    this.mediumButton = document.getElementsByClassName('btnModal')[1]; // panel user - update po odp
    this.hardButton = document.getElementsByClassName('btnModal')[2]; // panel user - update po odp

    this.easyButton.addEventListener('click', this.easyMode.bind(this));
    this.mediumButton.addEventListener('click', this.mediumMode.bind(this));
    this.hardButton.addEventListener('click', this.hardMode.bind(this));

  }

  easyMode() {
    this.setBasicValue(3, 5000, 0, 'easyScore');
    this.controller.fetchDataApi("easyScore");
  }
  mediumMode() {
    this.setBasicValue(2, 500, 0, 'mediumScore');
    this.controller.fetchDataApi("mediumScore");
  }
  hardMode() {
    this.setBasicValue(1, 55550, 0, 'hardScore');
    this.controller.fetchDataApi("hardScore");
  }

  setBasicValue(numberOfLife, money, score, level) {
    this.controller.saveInitData({
      name: this.userNameInput.value,
      life: numberOfLife,
      money: money,
      score: score,
      level: level,
      id: this.controller.getUserData().length
    });
  }
}
