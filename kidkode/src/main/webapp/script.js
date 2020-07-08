/*this function is useful that when we update the map we can 
just call getorDefault to get the value (or 0 if the key wasn't in the map) 
without having to worry if that key was already there or not (see example below)*/

function getOrDefault(key, map) {
  let res = map.get(key);
  if (res) {
    return res;
  } else {
    return 0;
  }
}


/*
 * BUILD QUIZ
 * This function takes each question and their options & builds the HTML
 * elements of the quiz.
 */
function buildQuiz() {
  // variable to store the HTML output
  const output = [];

  // for each question...
  myQuestions.forEach((currentQuestion, questionNumber) => {
    // variable to store the list of possible answers
    const answers = [];

    // and for each available answer...
    for (var option in currentQuestion.answers) {
      // ...add an HTML radio button
      answers.push(
        `<label>
              <input type="radio" name="question${questionNumber}" value="${option}">
              ${currentQuestion.answers[option].choice}
          </label>`
      );
    }

    // add this question and its answers to the output
    output.push(
      `<div class="question"> ${currentQuestion.question} </div>
        <div class="answers"> ${answers.join("")} </div>`
    );
  });

  // finally combine our output list into one string of HTML and put it on the page
  quizContainer.innerHTML = output.join("");
}


/*
 * SHOW RESULTS
 * First, we check whether the user picked "yes" or "no" as their choice for each
 * question. Based on their choice, we add the careers under that choice into a 
 * hashmap, and increment the points for the corresponding careers in the hashmap
 */
function showResults() {
  // get answer containers from our quiz
  const answerContainers = quizContainer.querySelectorAll(".answers");

  // create empty hashmap for the user's results
  let resultTracker = new Map();

  // for each question interate through each carrer in points array...
  myQuestions.forEach((currentQuestion, questionNumber) => {
    const answerContainer = answerContainers[questionNumber];
    const selector = `input[name=question${questionNumber}]:checked`;
    const userAnswer = (answerContainer.querySelector(selector) || {}).value;

    for (var i in currentQuestion.answers) {
      if (userAnswer === currentQuestion.answers[i].choice) {
        // ...and increment points for appropriate careers in hashmap
        let pointsArr = currentQuestion.answers[i].points;
        for (var j in pointsArr) {
          let key = pointsArr[j];
          resultTracker.set(key, getOrDefault(key, resultTracker) + 1);
        }
      }
    }
  });

  // create a variable to store the HTML output
  const output = [];

  // add results from hashmap into output
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
 * VARIABLES
 */
const quizContainer = document.getElementById("quiz");
const resultsContainer = document.getElementById("results");
const submitButton = document.getElementById("submit");
const myQuestions = [
  {
    number: 0,
    question: "Do you like to play videogames?",
    answers: {
      yes: {
        choice: "yes",
        points: ["gameDev", "animation", "2-dAnimation"],
        next: 1
      },
      no: {
        choice: "no",
        points: ["intDesign", "webDesign", "UX"],
        next: 2
      }
    },
    previous: null
  },
  {
    number: 1,
    question: "Do you like to create art?",
    answers: {
      yes: {
        choice: "yes",
        points: ["gameArt", "animation", "3-dAnimation"],
        next: 3
      },
      no: {
        choice: "no",
        points: ["gameDev", "conceptArt", "2-dAnimation"],
        next: 4
      }
    },
    previous: 0 // previous method will have to subtract point that was just added to hashmap
  }
];

/*
 * Build the quiz
 */
buildQuiz();

/*
 * Event Listeners
 */
submitButton.addEventListener("click", showResults);
