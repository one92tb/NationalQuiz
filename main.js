nationalQuiz.model = new nationalQuiz.Model();

nationalQuiz.controller = new nationalQuiz.Controller();

nationalQuiz.countryNameView = new nationalQuiz.CountryNameView(nationalQuiz.controller);
nationalQuiz.flagView = new nationalQuiz.FlagView(nationalQuiz.controller);
nationalQuiz.chartsView = new nationalQuiz.ChartsView(nationalQuiz.controller);
nationalQuiz.userView = new nationalQuiz.UserView(nationalQuiz.controller);

nationalQuiz.initModalView = new nationalQuiz.InitModalView(nationalQuiz.controller);
nationalQuiz.successModalView = new nationalQuiz.SuccessModalView(nationalQuiz.controller);
nationalQuiz.failModalView = new nationalQuiz.FailModalView(nationalQuiz.controller);
nationalQuiz.gameOverModalView = new nationalQuiz.GameOverModalView(nationalQuiz.controller);

nationalQuiz.controller.initialize(nationalQuiz.model ,nationalQuiz.countryNameView, nationalQuiz.flagView, nationalQuiz.chartsView, nationalQuiz.userView, nationalQuiz.initModalView, nationalQuiz.successModalView, nationalQuiz.failModalView, nationalQuiz.gameOverModalView);
