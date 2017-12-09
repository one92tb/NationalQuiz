nationalQuiz.Model = class {
  constructor() {

    this.user = [];

    if (!localStorage.user) {
      localStorage.user = JSON.stringify(this.user);
    }
  }

  set userData(obj) {
    this.user = JSON.parse(localStorage.user);
    this.user.push(obj);
    localStorage.user = JSON.stringify(this.user);
  }

  get userData() {
    return JSON.parse(localStorage.user);
  }

  updateUserScore(score) {
    this.user = JSON.parse(localStorage.user);
    this.user[this.user.length-1].score += score;
    localStorage.user = JSON.stringify(this.user);
  }
  removeUserLife(life) {
    this.user = JSON.parse(localStorage.user);
    this.user[this.user.length-1].life += life;
    localStorage.user = JSON.stringify(this.user);
  }

}
