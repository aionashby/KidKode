///////////////
// FUNCTIONS //
///////////////
/*
 * Obtain quiz questions from the JSON file and build the quiz.
 * We'll have different JSON files being fetched depending on what the user selects.
 */
function startQuiz() {
  fetch("quizSteps.json")
    .then(res => res.json())
    .then(output => {
      buildQuiz(output);
      showSlide(currentSlide); // THIS NEEDS TO BE MOVED SOMEWHERE ELSE?
    });
}

/*
 * Obtain quiz questions from the JSON file and show results of the quiz.
 * We'll have different JSON files being fetched depending on what the user selects.
 */
function showResults() {
  fetch("quizSteps.json")
    .then(res => res.json())
    .then(output => {
      displayResults(output);
    });
}

/*
 * Update the hashmap by getting the value (or 0 if the key wasn't
 * in the map).
 */
function getOrDefault(key, map) {
  let res = map.get(key);
  if (res) {
    return res;
  } else {
    return 0;
  }
}

/*
 * This function takes each question and their options & builds the HTML
 * elements of the quiz.
 */
function buildQuiz(testQuestions) {
  const output = []; // variable to store the HTML output

  // for each set of questions, interate through each step and its items
  var questionNumber = 0;
  for (let [step, stepItems] of Object.entries(testQuestions)) {
    const answers = []; // variable to store the list of possible answers
    // and for each available answer, add HTML radio button
    for (var option in stepItems.answers) {
      answers.push(
        `<label>
              <input type="radio" name="question${questionNumber}" value="${option}">
              ${option}
          </label>`
      );
    }

    // add question and its answers to the output
    output.push(
      `<div class="slide">
          <div class="question"> ${stepItems.question} </div>
          <div class="answers"> ${answers.join("")} </div>
        </div>`
    );
    questionNumber++;
  }

  // finally combine our output list into one string of HTML and put it on the page
  quizContainer.innerHTML = output.join("");
}

/*
 * This function first checks whether the user picked "yes" or "no" as their choice
 * for each question. Based on their choice, we add the careers under that choice into a
 * hashmap, and increment the points for the corresponding careers in the hashmap.
 */
function displayResults(testQuestions) {
  // get answer containers from quiz
  const answerContainers = quizContainer.querySelectorAll(".answers");

  // create empty hashmap for the user's results
  let resultTracker = new Map();

  // for each question interate through each carrer in points array...
  var questionNumber = 0;
  for (let [step, stepItems] of Object.entries(testQuestions)) {
    const answerContainer = answerContainers[questionNumber];
    const selector = `input[name=question${questionNumber}]:checked`;
    const userAnswer = (answerContainer.querySelector(selector) || {}).value;

    for (var option in stepItems.answers) {
      if (userAnswer === stepItems.answers[option].choice) {
        // ...and increment points for appropriate careers in hashmap
        let pointsArr = stepItems.answers[option].points;
        for (var j in pointsArr) {
          let key = pointsArr[j];
          resultTracker.set(key, getOrDefault(key, resultTracker) + 1);
        }
      }
    }
    questionNumber++;
  }

  // create a variable to store the HTML output and add results from hashmap into output
  const output = [];
  function createHTMLElements(value, key, resultTracker) {
    output.push(
      `<h2> ${key} </h2>
          <h3> ${value} </h3>`
    );
  }
  resultTracker.forEach(createHTMLElements);

  // show total points for each category in hashmap
  resultsContainer.innerHTML = output.join("");
}

///////////////
// VARIABLES //
///////////////
const quizContainer = document.getElementById("quiz");
const resultsContainer = document.getElementById("results");
const submitButton = document.getElementById("submit");
const previousButton = document.getElementById("previous");
const nextButton = document.getElementById("next");
let slides = document.getElementsByClassName("slide");
let currentSlide = 0;

////////////////
// START QUIZ //
////////////////
startQuiz();

////////////////
// PAGINATION //
////////////////
/*
 * The following functions call the showSlide() function with the next or
 * previous slide.
 */
function showNextSlide() {
  showSlide(currentSlide + 1);
}

function showPreviousSlide() {
  showSlide(currentSlide - 1);
}

/*
 * This function shows and hides the appropriate slides and buttons depending
 * on which slide is active and which aren't.
 */
function showSlide(n) {
  slides[currentSlide].classList.remove("active-slide");
  slides[n].classList.add("active-slide");
  currentSlide = n;
  if (currentSlide === 0) {
    previousButton.style.display = "none";
  } else {
    previousButton.style.display = "inline-block";
  }
  if (currentSlide === slides.length - 1) {
    nextButton.style.display = "none";
    submitButton.style.display = "inline-block";
  } else {
    nextButton.style.display = "inline-block";
    submitButton.style.display = "none";
  }
}

/////////////////////
// EVENT LISTENERS //
/////////////////////
submitButton.addEventListener("click", showResults);
previousButton.addEventListener("click", showPreviousSlide);
nextButton.addEventListener("click", showNextSlide);
