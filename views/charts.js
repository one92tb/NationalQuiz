nationalQuiz.ChartsView = class {

  constructor(controller) {
    this.controller = controller;
    this.charts = document.getElementsByClassName('countryCharts')[0];
  }


  drawCharts(tableLetters) {
    let countryCharts = '';
 // TU WSTAW ID!!!
    for (let i = 0; i < tableLetters.length; i++) {
        countryCharts += `
      <div class ="dropzone">
        <div class="countryChart chart${i}" draggable="true"><span class="letters">${tableLetters[i]}</div>
      </div>
      `
    }
    this.charts.innerHTML = countryCharts;
    this.deleteEmptySquare();
  }

  shuffle(data, countryId) {
    this.country = data[countryId].name;
    this.tableLetters = this.country.split('');

    for (let i = this.tableLetters.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.tableLetters[i], this.tableLetters[j]] = [this.tableLetters[j], this.tableLetters[i]];
    }
    this.drawCharts(this.tableLetters);
  }

  deleteEmptySquare(){
    for(let i = 0; i < this.tableLetters.length; i++){
      if (document.getElementsByClassName('countryCharts')[0].children[i].children[0].children[0].innerText === ""){
        document.getElementsByClassName('countryCharts')[0].children[i].classList.add('displayNone');
      }
    }
  }
  restoreCharts(){

    this.controller.getDroppedLetter().forEach(record=>{
        this.charts.children[record.id].innerHTML = `  <div class="countryChart chart${record.id}" draggable="true"><span class="letters">${record.letter}</div>`;
    })
    this.controller.clearLettersTable();
  }
}
