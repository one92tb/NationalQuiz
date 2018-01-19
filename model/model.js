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
    this.user.push(obj);
    this.user.sort((a, b) => b.score - a.score);
    localStorage.user = JSON.stringify(this.user);
  }

  get userData() {
    return JSON.parse(localStorage.user);
  }

  updateUserScore(score) {
    this.user = JSON.parse(localStorage.user); //blad bo wybiera ost
    let lastUser = this.user.reduce((prev, current) => (prev.id > current.id) ? prev : current)
    lastUser.score += score;
    localStorage.user = JSON.stringify(this.user);
  }
  removeUserLife(life) {
    this.user = JSON.parse(localStorage.user);
    let lastUser = this.user.reduce((prev, current) => (prev.id > current.id) ? prev : current)
    console.log(lastUser);
    lastUser.life += life;
    localStorage.user = JSON.stringify(this.user);
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
