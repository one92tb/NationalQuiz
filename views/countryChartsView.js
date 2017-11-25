nationalQuiz.ChartsView = class {
  constructor(controller) {
    this.controller = controller;
    this.charts = document.getElementById('charts');

    document.addEventListener('drag', this.drag);
    document.addEventListener('dragstart', this.dragStart.bind(this));
    document.addEventListener('dragover', this.dragEnd.bind(this));
    document.addEventListener('dragenter', this.dragOver.bind(this));
    document.addEventListener('dragleave', this.dragEnter.bind(this));
    document.addEventListener('dragleave', this.dragLeave.bind(this));
    document.addEventListener('drop', this.drop.bind(this));
  }


  drawCharts(tableLetters) {
    let countryCharts = '';

    for (let i = 0; i < tableLetters.length; i++) {
      countryCharts += `<div class = "dropzone">
      <div class="countryChart draggable="true">s</div>
      </div>`
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

  drag() {
    console.log('drop');
  }

  dragStart() {
    console.log('dragStart');
    this.dragged = event.target;
    event.target.style.opacity = .5;
    console.log(this.dragged);

  }

  dragEnd() {
    console.log('dragEnd');
    event.target.style.opacity = "";
  }

  dragOver() {
    console.log('dragOver');
    event.preventDefault();
  }

  dragEnter() {
    console.log('dragEnter');
    if (event.target.className == "dropzone") {
      event.target.style.background = "black";
    }
  }
  dragLeave() {
    console.log('dragOver');
    if (event.target.className == "dropzone") {
      event.target.style.background = "";
    }
  }

  drop() {
    console.log('drop');
    event.preventDefault();

    // move dragged elem to the selected drop target
    if (event.target.className == "dropzone") {
      event.target.style.background = "";
      this.dragged.parentNode.removeChild(this.dragged);
      console.log(this.dragged);
      event.target.appendChild(this.dragged);
      console.log(event.target);
    }
  }

}
