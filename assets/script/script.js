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
    question: "Question two? (answer is the first choice)",
    choices: ["one", "two", "three", "four"],
    answer: "two",
  },
  {
    question: "Question three? (answer is the first choice)",
    choices: ["one", "two", "three", "four"],
    answer: "three",
  },
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

//Todo: A func to run show_question & start_timer on click event

function start_quiz() {
  question_index = 0;
  time_left = parseInt(initial_time);
  start.style.display = "none";

  time_span.textContent = time_left;
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
      choices_list.appendChild(li);
    });
  } else {
    return;
  }
}

//?Set up timer,
function start_timer() {
  timer_interval = setInterval(function () {
    time_left--;
    time_span.textContent = time_left;

    if (time_left == 0) {
      clearInterval(timer_interval);
      return;
    }
  }, 1000);
}

start.addEventListener("click", start_quiz);
