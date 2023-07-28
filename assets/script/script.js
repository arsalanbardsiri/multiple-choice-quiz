/*
## User Story

```
AS A coding boot camp student
I WANT to take a timed quiz on JavaScript fundamentals that stores high scores
SO THAT I can gauge my progress compared to my peers
```

## Acceptance Criteria

```
GIVEN I am taking a code quiz
WHEN I click the start button
THEN a timer starts and I am presented with a question
WHEN I answer a question
THEN I am presented with another question
WHEN I answer a question incorrectly
THEN time is subtracted from the clock
WHEN all questions are answered or the timer reaches 0
THEN the game is over
WHEN the game is over
THEN I can save my initials and my score
```
*/

//Todo, data structure to store questions.
var questions = [
  {
    question: "Question one? (answer is the first choice)",
    choices: ["one", "two", "three", "four"],
    answer: "one",
  },
  {
    question: "Question two? (answer is the second choice)",
    choices: ["one", "two", "three", "four"],
    answer: "two",
  },
  {
    question: "Question three? (answer is the third choice)",
    choices: ["one", "two", "three", "four"],
    answer: "three",
  },
  {
    question: "Question three? (answer is the forth choice)",
    choices: ["one", "two", "three", "four"],
    answer: "four",
  }
];
var question_index = 0;
var question_text = document.querySelector("#question");
var choices_list = document.querySelector("#choices");

//Todo: storing vars for timer
var time_span = document.querySelector("#time");
var initial_time = (time_span.textContent = "60");
var time_left = parseInt(initial_time);
var timer_interval;

//?accessing start button on html
var start = document.querySelector("#start");

//?Track score
var score = 0;

//?Correct or Wrong
var feedback_message = document.querySelector("#feedback");

//?Result
var result_div = document.querySelector("#result");

//?Save scores
var initials_form = document.querySelector("#initials-form");
var initials_input = document.querySelector("#initials");

//?Restart and clear on last page
var restart = document.querySelector("#restart-button");
var clear = document.querySelector("#clear-button");

//Todo: A func to run show_question & start_timer on click event

function start_quiz() {
  question_index = 0;
  score = 0;
  result_div.textContent = "";
  time_left = parseInt(initial_time);
  time_span.textContent = time_left;
  initials_form.style.display = "none";
  restart.style.display = "none";
  clear.style.display = "none";
  show_question();
  start_timer();
}

//todo, Appearing the q
function show_question() {
  if (question_index < questions.length) {
    var current = questions[question_index];
    question_text.textContent = current.question;

    //?Adding list of choices
    choices_list.textContent = "";
    current.choices.forEach((choice) => {
      var li = document.createElement("li");
      li.textContent = choice;
      //?Need to check answer & clickable li elements
      li.addEventListener("click", () => check_answer(choice));
      choices_list.appendChild(li);
    });
  } else {
    end_quiz();
  }
}

//todo, checking answer
function check_answer(choice) {
  var current = questions[question_index];
  if (choice === current.answer) {
    score++;
    feedback("Correct!", "green");
  } else {
    time_left -= 10;
    if (time_left < 0) {
      time_left = 0;
    }
    time_span.textContent = time_left;
    feedback("Wrong! -10 sec", "red");
  }
  question_index++;
  show_question();
}

//todo, Correct and Wrong message
function feedback(message, color) {
  feedback_message.textContent = message;
  feedback_message.style.color = color;

  setTimeout(() => {
    feedback_message.textContent = "";
    feedback_message.style.color = "";
  }, 1000);
}

//todo, timer
function start_timer() {
  timer_interval = setInterval(() => {
    time_left--;
    //?Timer does not enter negative and ends on 0
    if (time_left <= 0) {
      clearInterval(timer_interval);
      end_quiz();
    } else {
      time_span.textContent = time_left;
    }
  }, 1000);
}

//Todo, ending quiz function needed, only returns does not work
function end_quiz() {
  clearInterval(timer_interval);
  question_text.textContent = "QUIZ OVER!";
  choices_list.textContent = "";
  result_div.textContent = `Your score, ${score}`;
  initials_form.style.display = "block";
  start.style.display = "none";
  //?Need to display restart and clear buttons here
  show_buttons();
}

function save_score(event) {
  event.preventDefault();

  //?Taking care of spaces
  var initials = initials_input.value.trim();
  //?Make sure not empty
  if (initials !== "") {
    var high_score = JSON.parse(localStorage.getItem("high_score")) || [];
    high_score.push({ initials, score });
    localStorage.setItem("high_score", JSON.stringify(high_score));
    initials_form.style.display = "none";

    //?function needed for listing of stored values, high scores
    display_score();
  }
}

function display_score() {
  var high_score = JSON.parse(localStorage.getItem("high_score")) || [];
  var high_score_list = "<h2>High Scores</h2><ul>";
  high_score.forEach((entry, index) => {
    high_score_list += `<li> ${index + 1}. ${entry.initials} : ${entry.score}</li>`;
  });
  high_score_list += "</ul>";
  //!Inner html apply the tags as well, but text.Content will not.
  result_div.innerHTML = high_score_list;
  start.style.display = "none";
}


function show_buttons() {
  restart.style.display = "block";
  clear.style.display = "block";
}

//Todo. Define the restart and clear list buttons
function restart_quiz() {
  question_index = 0;
  score = 0;
  result_div.textContent = "";
  time_left = parseInt(initial_time);
  time_span.textContent = time_left;
  initials_form.style.display = "none";
  clearInterval(timer_interval);
  start_quiz();
}

function clear_board() {
  localStorage.removeItem("high_score");
  display_score();
}

//?clickable and functional buttons
start.addEventListener("click", start_quiz);
initials_form.addEventListener("submit", save_score);


restart.addEventListener("click", restart_quiz);
clear.addEventListener("click", clear_board);
