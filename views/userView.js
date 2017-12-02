nationalQuiz.UserView = class {

  constructor(controller) {
    this.controller = controller;

    this.insertUserName = document.getElementsByClassName('insertUserName')[0];
    this.buttonNextCountry = document.getElementsByClassName('btnNextCountry')[0];
    this.btnAgainCountry = document.getElementsByClassName('btnAgainCountry')[0];

    this.userValue = document.getElementsByClassName('userValue')[0];
    this.lifeValue = document.getElementsByClassName('lifeValue')[0];
    this.scoreValue = document.getElementsByClassName('scoreValue')[0];

    this.easyButton = document.getElementsByClassName('modalButton')[0];
    this.mediumButton = document.getElementsByClassName('modalButton')[1];
    this.hardButton = document.getElementsByClassName('modalButton')[2];

    this.easyButton.addEventListener('click', this.easyMode.bind(this));
    this.mediumButton.addEventListener('click', this.mediumMode.bind(this));
    this.hardButton.addEventListener('click', this.hardMode.bind(this));

    this.buttonNextCountry.addEventListener('click', this.refreshUserData.bind(this));
    this.btnAgainCountry.addEventListener('click', this.refreshUserData.bind(this));
  }

  easyMode() {
    this.setBasicValue(3, 0);

  }
  mediumMode() {
    this.setBasicValue(2, 0);

  }
  hardMode() {
    this.setBasicValue(1, 0);
  }

  setBasicValue(numberOfLife, score) {
    this.numberOfLife = numberOfLife;
    this.score = score;

    this.userValue.innerText = this.insertUserName.value;
    this.lifeValue.innerText = this.numberOfLife;
    this.scoreValue.innerText = this.score;

    this.controller.save({
      name: this.insertUserName.value,
      life: this.numberOfLife,
      score: this.score
    })
  }

  refreshUserData() {
    this.userValue.innerText = this.controller.getUserData()[0].name;
    this.lifeValue.innerText = this.controller.getUserData()[0].life;
    this.scoreValue.innerText = this.controller.getUserData()[0].score;
  }
}
