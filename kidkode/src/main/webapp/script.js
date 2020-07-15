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
  var stepNumber = 0;
  for (let [step, stepItems] of Object.entries(testQuestions)) {
    const answers = []; // variable to store the list of possible answers
    // and for each available answer, add HTML radio button
    for (var option in stepItems.answers) {
      answers.push(
        `<label>
            <input type="radio" name="question${stepNumber}" value="${option}">
            ${option}
        </label>`
      );
    }

    // add question and its answers to the output
    output.push(
      `<div class="question"> ${stepItems.question} </div>
      <div class="answers"> ${answers.join("")} </div>`
    );
    stepNumber++;
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
  var stepNumber = 0;
  for (let [step, stepItems] of Object.entries(testQuestions)) {
    const answerContainer = answerContainers[stepNumber];
    const selector = `input[name=question${stepNumber}]:checked`;
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
    stepNumber++;
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

/*
 * HTML containers and variables.
 */
const quizContainer = document.getElementById("quiz");
const resultsContainer = document.getElementById("results");
const submitButton = document.getElementById("submit");

/*
 * Obtain quiz questions from the JSON file and build the quiz.
 */
function startQuiz() {
  fetch("quizSteps.json")
    .then(res => res.json())
    .then(output => {
      buildQuiz(output);
    });
}

/*
 * Obtain quiz questions from the JSON file and show results of the quiz.
 */
function showResults() {
  fetch("quizSteps.json")
    .then(res => res.json())
    .then(output => {
      displayResults(output);
    });
}

/*
 * Start Quiz
 */
startQuiz();
submitButton.addEventListener("click", showResults);
