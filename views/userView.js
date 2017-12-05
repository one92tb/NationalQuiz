nationalQuiz.UserView = class {

  constructor(controller) {
    this.controller = controller;

    this.insertUserName = document.getElementsByClassName('insertUserName')[0];
    this.buttonNextCountry = document.getElementsByClassName('btnNextCountry')[0];
    this.btnAgainCountry = document.getElementsByClassName('btnAgainCountry')[0];
    this.btnStartAgain = document.getElementsByClassName('btnStartAgain')[0];


    this.userValue = document.getElementsByClassName('userValue')[0];
    this.lifeValue = document.getElementsByClassName('lifeValue')[0];
    this.scoreValue = document.getElementsByClassName('scoreValue')[0];

    this.easyButton = document.getElementsByClassName('modalButton')[0]; // panel user - update po odp
    this.mediumButton = document.getElementsByClassName('modalButton')[1]; // panel user - update po odp
    this.hardButton = document.getElementsByClassName('modalButton')[2]; // panel user - update po odp

    this.easyButton.addEventListener('click', this.easyMode.bind(this));
    this.mediumButton.addEventListener('click', this.mediumMode.bind(this));
    this.hardButton.addEventListener('click', this.hardMode.bind(this));

    this.buttonNextCountry.addEventListener('click', this.nextCountry.bind(this));
    this.btnAgainCountry.addEventListener('click', this.refreshUserData.bind(this));
    this.btnStartAgain.addEventListener('click', this.startAgain());


  }

  easyMode() {
    this.setBasicValue(3, 1000, 'easyScore');
  }
  mediumMode() {
    this.setBasicValue(2, 500, 'mediumScore');
  }
  hardMode() {
    this.setBasicValue(1, 0, 'hardScore');
  }

  setBasicValue(numberOfLife, score, level) {
    this.numberOfLife = numberOfLife;
    this.score = score;
    this.level = level;

    this.userValue.innerText = this.insertUserName.value;
    this.lifeValue.innerText = this.numberOfLife;
    this.scoreValue.innerText = this.score;

    this.controller.save({
      name: this.insertUserName.value,
      life: this.numberOfLife,
      score: this.score,
      level: this.level
    })
  }

  nextCountry(){
    this.refreshUserData();
    this.controller.fetchDataApi();
  }

  refreshUserData() { // aktualizujemy dane aktualnego użytkownika
    console.log(this.controller.getUserData()[this.controller.getUserData().length-1]);
    this.userValue.innerText = this.controller.getUserData()[this.controller.getUserData().length-1].name;
    this.lifeValue.innerText = this.controller.getUserData()[this.controller.getUserData().length-1].life;
    this.scoreValue.innerText = this.controller.getUserData()[this.controller.getUserData().length-1].score;
  }

  startAgain(){

  }

}
