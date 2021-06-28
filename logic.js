var time = questions.length * 15;
var currentQuestionIndex = 0;
// first question in the arry,hence why it is zero

var startBtn = document.querySelector("#start");
var startScreen = document.querySelector("#start-screen");
var titleElement = document.querySelector("#question-title");
var questionsElement = document.querySelector("#questions");
var questionsChoices = document.querySelector("#choices");
var timerElement = document.querySelector("#time");


function startQuiz() {
    startScreen.setAttribute("class","hide");
    questionsElement.removeAttribute("hide");
    

}
 
function getCurrentQuestion() {
    var currentQuestion = questions[currentQuestionIndex];
    titleElement.textContent = currentQuestion.title;
    questionsChoices.textContent = " "

    for (var i = 0; i < currentQuestion.choice.length; i++) {
        var choiceNode = document.createElement("button");
        choiceNode.setAttribute("class", "choice");
        choiceNode.setAttribute("value", currentQuestion.choice[i]);

        choiceNode.textContent = i + 1 + ". " + currentQuestion.choice[i];

        questionsChoices.appendChild(choiceNode);



    }

}



startBtn.addEventListener("click", startQuiz);