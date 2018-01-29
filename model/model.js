nationalQuiz.Model = class {
  constructor() {

    this.user = [];
    this.letters = [];

    if (!localStorage.user) {
      localStorage.user = JSON.stringify(this.user);
    }

    if (!localStorage.letters) {
      localStorage.letters = JSON.stringify(this.letters);
    }
  }

  set userData(obj) {
    this.user = JSON.parse(localStorage.user);
    console.log(obj);
    this.user.push(obj);
    this.sortUserData();
  }

  get userData() {
    return JSON.parse(localStorage.user);
  }
  sortUserData() {
    this.user.sort((a, b) => b.score - a.score);
    localStorage.user = JSON.stringify(this.user);
  }

  updateUserData(score, life, money) {
    this.user = JSON.parse(localStorage.user);
    let lastUser = this.user.reduce((prev, current) => (prev.id > current.id) ? prev : current);
    lastUser.life += life;
    lastUser.score += score;
    lastUser.money += money;
    this.sortUserData();
  }
  set countryLetter(obj) {
    this.letters = JSON.parse(localStorage.letters);
    this.letters.push(obj);
    localStorage.letters = JSON.stringify(this.letters);
  }
  get countryLetter() {
    return JSON.parse(localStorage.letters);
  }
  clearLettersTable() {
    this.letters = JSON.parse(localStorage.letters);
    this.letters = [];
    localStorage.letters = JSON.stringify(this.letters);
  }
}
