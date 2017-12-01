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
    this.onlyActualUser();
    localStorage.user = JSON.stringify(this.user);
  }

  get userData() {
    return JSON.parse(localStorage.user);
  }
  onlyActualUser(){
    if (this.user.length === 2){
      this.user.splice(0,1);
    }
  }
  addUserScore(score){
    this.user = JSON.parse(localStorage.user);
    this.user[0].score += 100;
    localStorage.user = JSON.stringify(this.user);
  }
  removeUserLife(life){
    this.user = JSON.parse(localStorage.user);
    this.user[0].life += -1;
    localStorage.user = JSON.stringify(this.user);
  }
}
