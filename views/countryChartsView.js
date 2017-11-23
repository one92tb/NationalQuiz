nationalQuiz.ChartsView = class {
  constructor(controller) {
    this.controller = controller;
    this.charts = document.getElementById('charts');
  }

  drawCharts(tableLetters) {
    let countryCharts = '';

    for (let i = 0; i < tableLetters.length; i++) {
      countryCharts += `<div class="countryChart">${tableLetters[i]}</div>`
    }
    this.charts.innerHTML = countryCharts;
  }

  shuffle(data, countryId) {

    let tableLetters = data[countryId].name.split('');
    console.log(tableLetters);

    for (let i = tableLetters.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [tableLetters[i], tableLetters[j]] = [tableLetters[j], tableLetters[i]];
    }
    this.drawCharts(tableLetters);
  }
}
