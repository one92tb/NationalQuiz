nationalQuiz.CountryNameView = class {

  constructor(controller) {
    this.controller = controller;
    this.countryPlace = document.getElementById('countryPlace');
    this.flag = document.getElementById('flag');

    document.addEventListener('drag', this.drag);
    document.addEventListener('dragstart', this.dragStart.bind(this));
    document.addEventListener('dragover', this.dragEnd.bind(this));
    document.addEventListener('dragenter', this.dragOver.bind(this));
    document.addEventListener('dragleave', this.dragEnter.bind(this));
    document.addEventListener('dragleave', this.dragLeave.bind(this));
    document.addEventListener('drop', this.drop.bind(this));
  }

  drawChartBoxes(data, countryId) {
    let countryCharts = '';

    for (let i = 0; i < data[countryId].name.length; i++) {
      countryCharts += `<div class="dropzone"></div>`
    }
    this.countryPlace.innerHTML = countryCharts;
  //  this.removeEmptyFields();
  }

  /*removeEmptyFields() {
    Array.from(this.countryPlace.children).forEach(field => {
      if (field.innerText === '') {
        field.classList.add('hideEmptySpace');
      }
    });
  }*/
  drag(){
    console.log('drop');
  }

  dragStart(){
    console.log('dragStart');
          this.dragged = event.target;
        //  event.target.style.opacity = .5;
          console.log(this.dragged);

  }

  dragEnd(){
    console.log('dragEnd');
          //event.target.style.opacity = "";
  }

  dragOver(){
    console.log('dragOver');
        event.preventDefault();
  }

  dragEnter(){
        console.log('dragEnter');
    if (event.target.className == "dropzone") {
    //  event.target.style.background = "black";
    }
  }
  dragLeave(){
    console.log('dragOver');
    if (event.target.className == "dropzone") {
    //  event.target.style.background = "";
    }
  }

  drop(){
    console.log('drop');
    event.preventDefault();

    // move dragged elem to the selected drop target
//    if (event.target.className == "dropzone") {
    //  event.target.style.background = "";
      this.dragged.parentNode.removeChild(this.dragged);
      console.log(this.dragged);
      event.target.appendChild(this.dragged);
      console.log(event.target);
  //  }
  }
}
