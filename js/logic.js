var time = questions.length * 15;
var currentQuestionIndex = 0;
console.log(questions);
var timer;
// first question in the arry,hence why it is zero

var startBtn = document.querySelector("#start");

var startScreen = document.querySelector("#start-screen");

var titleElement = document.querySelector("#question-title");

var questionsElement = document.querySelector("#questions");

var questionsChoices = document.querySelector("#choices");

var submitBtn = document.querySelector("#submit");

var highscores = document.querySelector("highscores");

var feedbackElement = document.querySelector("#feedback");

var initialsElement = document.querySelector("#initials");

var gameOverElement = document.querySelector("#end-screen");

var finalScoreElement = document.querySelector("final-score");

var timeElement = document.querySelector("#time");

function startQuiz() {
  startScreen.setAttribute("hide", " ");
  questionsElement.removeAttribute("class", "hide");

  timer = setInterval(function () {
    clockTick();
  }, 1000);

  timeElement.textContent = time;
  for (var i = 0; i < 4; i++) {
    var choiceNode = document.createElement("button");
    // assign the button a class of choice (104)
    choiceNode.setAttribute("class", "choice");
    console.log(questions[0].choice[i]);
    choiceNode.setAttribute("value", questions[0].choice[i]);
    choiceNode.textContent = questions[0].choice[i];
    questionsChoices.appendChild(choiceNode);
  }
  getCurrentQuestion();
}

function getCurrentQuestion() {
  var currentQuestion = questions[currentQuestionIndex];

  titleElement.textContent = currentQuestion.title;

  var changeChoice = document.getElementsByClassName("choice");
  console.log(changeChoice);

  for (var i = 0; i < 4; i++) {
    // i take the first button in the change choice array, equal to choice key of the q's objects at the same position
    changeChoice[i].innerHTML = currentQuestion.choice[i];
  }
}
questionsChoices.addEventListener("click", function (event) {
  questionClick(event.target.value);
});
// })
//   questionsChoices.children[0].addEventListener("click", function (event) {
//     questionClick(questionsChoices.children[0]);

//   });

//   questionsChoices.children[1].addEventListener("click", function (event) {
//     questionClick(questionsChoices.children[1]);
//   });

//   questionsChoices.children[2].addEventListener("click", function (event) {
//     questionClick(questionsChoices.children[2]);
//   });
//   {
//     questionsChoices.children[3].addEventListener("click", function (event) {
//       questionClick(questionsChoices.children[3]);
//     });
//   }

function questionClick(answerChoice) {
  console.log(answerChoice.textContent);
  console.log(currentQuestionIndex);
  console.log(questions[currentQuestionIndex].answer);

  if (answerChoice.textContent != questions[currentQuestionIndex].answer) {
    time -= 10;
    feedbackElement.textContent = "Incorrect";
  } else {
    feedbackElement.textContent = "Correct";
  }
  feedbackElement.setAttribute("class", "feedback");
  setInterval(function () {
    feedbackElement.setAttribute("class", "feedback hide");
  }, 500);

  if (currentQuestionIndex === questions.length) {
    quizOver();
  } else {
    currentQuestionIndex++;
    getCurrentQuestion();
  }
}

function quizOver() {
  clearInterval(clock);
  timeElement.textContent = time;
  gameOverElement.setAttribute("class", " ");
  finalScoreElement.textContent = time;
  questionsElement.setAttribute("class", "hide");
}

function clockTick() {
  time--;
  timeElement.textContent = time;

  if (time <= 0) quizOver();
}

function saveHighscores() {
  initials = initialsElement.value.toUppercase();
  if (initials === "") {
    alert("You must write your initials please.");
    return;
  } else if (initials.length > 3) {
    alert("Only 3 characters please.");
    return;
  } else {
    var highscores;
    if (JSON.parse(localStorage.getItem("highscores")) != null)
      highscores = JSON.parse(window.localStorage.getItem("highscores"));
    else highscores = [];
    var newScores = {
      initials: initials,
      score: time,
    };

    highscores.push(newScores);

    localStorage.setItem("highscores", JSON.stringify("highscores"));

    location.href = "highscores.html";
  }
}

function checkForEnter(event) {
  if (event.keyCode === 13) saveHighscore();
}

submitBtn.addEventListener("click", saveHighscores);
startBtn.addEventListener("click", startQuiz);
initialsElement.addEventListener("text", checkForEnter);
