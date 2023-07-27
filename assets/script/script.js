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

//!Setting up question section,

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

//!Appearing the q
var question_index = 0;
var question_text = document.querySelector("#question");


function show_question() {
    var current = questions[question_index];
    question_text.textContent = current.question;

}
show_question();

//!Set up timer,
var time_span = document.querySelector("#time");
var initial_time = (time_span.textContent = "60");
var time_left = parseInt(initial_time);
var timer_interval;

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
start_timer();
