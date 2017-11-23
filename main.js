nationalQuiz.controller = new nationalQuiz.Controller();
nationalQuiz.countryNameView = new nationalQuiz.CountryNameView(nationalQuiz.controller);
nationalQuiz.flagView = new nationalQuiz.FlagView(nationalQuiz.controller);
nationalQuiz.chartsView = new nationalQuiz.ChartsView(nationalQuiz.controller);

nationalQuiz.controller.initialize(nationalQuiz.countryNameView, nationalQuiz.flagView, nationalQuiz.chartsView);
