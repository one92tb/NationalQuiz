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

        this.userValue.innerText = this.controller.getUserData()[this.controller.getUserData().length - 1].name;

        this.counter = this.controller.getUserData()[this.controller.getUserData().length - 1].life;

       // console.log(this.counter);

        let lifes = '';

        for (let i = 0; i < this.counter; i++) {
            lifes += `<i class="icon-heart heart"></i>`;
        }

        this.lifeValue.innerHTML = lifes;

        this.scoreValue.innerText = this.controller.getUserData()[this.controller.getUserData().length - 1].score;
    }

    clickHint() {
        (this.scoreValue.innerText < 100) ? alert('Your score is too low'): this.controller.handleHint();
    }

    clickCountryHint() {
        (this.scoreValue.innerText < 1000) ? alert('Your score is too low'): this.controller.handleCountryHint();
    }
}
