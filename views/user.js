nationalQuiz.UserView = class {

  constructor(controller) {
    this.controller = controller;

    this.userName = document.getElementsByClassName('userName')[0];

    this.userValue = document.getElementsByClassName('userValue')[0];
    this.lifeValue = document.getElementsByClassName('lifeValue')[0];
    this.scoreValue = document.getElementsByClassName('scoreValue')[0];

    this.btnHint = document.getElementsByClassName('btnHint')[0];
    this.btnShowCountry = document.getElementsByClassName('btnShowCountry')[0];

    this.btnHint.addEventListener('click', this.clickHint.bind(this));
    this.btnShowCountry.addEventListener('click', this.clickCountryHint.bind(this));
  }

  refreshUserData() { // aktualizujemy dane aktualnego użytkownika
    console.log(this.controller.getUserData()[this.controller.getUserData().length - 1]);
    this.userValue.innerText = this.controller.getUserData()[this.controller.getUserData().length - 1].name;
    this.lifeValue.innerText = this.controller.getUserData()[this.controller.getUserData().length - 1].life;
    this.scoreValue.innerText = this.controller.getUserData()[this.controller.getUserData().length - 1].score;
  }

  clickHint() {
    this.controller.handleHint();
  }

  clickCountryHint(){
    this.controller.handleCountryHint();
  }
}
