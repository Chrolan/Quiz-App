//question number, then we will use a correctAnswers to increment and pass to score to calculate as a percentage
let questionNumber = -1
let correctAnswers = 0

//need start 
function startQuiz () {
  if (questionNumber < 0) {
    return `<input type="submit" class="start-quiz" value="Start Quiz Now!"></input>`
  }
  else {
    return questionGenerator();
  }
};

function startQuizButton () {
  $('.question-answer-box').on('click','.start-quiz', event => {
    event.preventDefault();
    incrementQuestionNumber();
    return renderQuestion();
  });
}

//need function to insert questions into "quesiton-box"
function questionGenerator () {
  input = ''
  for (i=0; i < questionAnswer[questionNumber].answers.length; i++) {
    input = input + `<label for="answer${i}" class="answer"><input id="answer${i}" name="answer" type="radio" class="answer-button" value="${questionAnswer[questionNumber].answers[i]}" required>${questionAnswer[questionNumber].answers[i]}</label>`
  } 
    generateHeader();
    return `<form class="question-form">
              <fieldset>
              <legend class="question">
              ${questionAnswer[questionNumber].question}
              </legend>
              ${input}
              <input type="submit" class="submit-answer" value="Submit Answer!"/>
              </fieldset>
            </form>`
}

//need function for submitting and giving result of question, while increment the questionNumber
function submitAnswer () {
  $('.question-answer-box').on('submit',( event => {
    //stop normal default form submition
    event.preventDefault();
    //need to submit the answer and check for correctAnswers
    let answer = $('input:checked').val();
    let correctAnswer = questionAnswer[questionNumber].correctAnswer;
    if (answer === correctAnswer) {
      keepScore();
      return renderResults(rightAnswer());
    }
    else {
      return renderResults(wrongAnswer());
    }}));
}

//functions to render the results pages
function rightAnswer() {
    if (questionNumber < 9) {
      return `<div class="results-box">
                <p>Congrats, you have successfully answered question number ${(questionNumber + 1)}. Only ${(questionAnswer.length - questionNumber) - 1} to go!</p>
                ${proceedButton()}
              </div>`
    }
    else {
      return `<div class="results-box">
              <span="scoreResult">You answered a total of ${correctAnswers} questions correctly!</span>
                ${proceedButton()}
              </div>`
    }
  }

 function wrongAnswer() {
   if (questionNumber < 9) {
    return `<div class="results-box">
              <span class="result">That is the wrong answer, the correct answer is ${questionAnswer[questionNumber].correctAnswer}. Only ${(questionAnswer.length - questionNumber) - 1} questions to go!</span>
              ${proceedButton()}
            </div>`
   }
   else {
     hideScore();
    return `<div class="results-box"><span="scoreResult">You answered a total of ${correctAnswers} questions correctly!</span>${proceedButton()}</div>`
   }
 }

 function proceedButton() {
   if (questionNumber < 9) {
    incrementQuestionNumber();
    return `<div class="next-question"><input type="button" class="next-question-button" value="Proceed to next question!"/></div>`
   }
   else {
     incrementQuestionNumber();
     hideScore();
     return `<div class="next-question">
                <input type="button" class="restart-button" value="Restart Quiz Now!"></input>
              </div>`
   }}

function getNextQuestion () {
  $('.question-answer-box').on('click','.next-question-button', (event => {
    //stop normal default form submition
    event.preventDefault();
    //testing output
    console.log('test');
    return renderQuestion();
  }));
}

//button to restart the quiz
function reloadQuiz() {
  $('.question-answer-box').on('click', '.restart-button', (event => {
    //stop normal default form submition
    event.preventDefault();
    //reload current page to begin test again
    questionNumber = 0;
    correctAnswers = 0;
    showScore();
    renderQuestion();
  }));
}


function hideScore() {
  $('div.results-box').addClass('hidden');
}

function showScore() {
  $('div.results-box').removeClass('hidden');
}

//inserts the results html 
function renderResults(result) {
  $('.question-answer-box').html(result);
}

//need function for starting the quiz, using .start-quiz
function renderQuestion() {
  $('.question-answer-box').html(startQuiz());
}

//need function to increment score
function keepScore() {
  correctAnswers ++;
}
//function to insert html of score
function displayScore() {
  $('.score-key').html('Correct Answers: ' + correctAnswers);
}

//need function to increment question number
function incrementQuestionNumber() {
  questionNumber ++;
  console.log(questionNumber);
}

//function to display question number in html 
function displayQuestionNumber () {
  $('.question-key').html('Question Number: ' + (questionNumber + 1) + '/10')
}

function generateHeader() {
  displayQuestionNumber();
  displayScore();
}

function quizAppStart() {
  renderQuestion();
  submitAnswer();
  getNextQuestion();
  renderResults();
  startQuizButton ();
  reloadQuiz();  
}

$(quizAppStart);