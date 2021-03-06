///////////////
// FUNCTIONS //
///////////////
/*
 * Redirect the user back to the homepage.
 */
function goHome() {
    window.location.assign('/');
}

/*
 * Parses the url query string to retrieve the value associated with the paramater passed in.
 * We'll use this to retrieve which JSON we should load based on the URL.
 */
function GetURLParameter(searchedParam){
    let URL = window.location.search.substring(1);
    let URLVariables = URL.split('&');
    for (let i = 0; i < URLVariables.length; i++) {
        let currentParam = URLVariables[i].split('=');
        if (currentParam[0] == searchedParam) {
            return currentParam[1];
        }
    }
}
/*
 * Obtain quiz questions from the JSON file and build the quiz.
 * We'll have different JSON files being fetched depending on what the user selects.
 */
function startQuiz() {
  fetch(jsonFile)
    .then(res => res.json())
    .then(output => {
      buildQuiz(output);
      showSlide(currentStep, null);
    });
   
}

/*
 * Obtain quiz questions from the JSON file and show results of the quiz.
 * We'll have different JSON files being fetched depending on what the user selects.
 */
function showResults() {
  fetch(jsonFile)
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
  // variable to store the HTML output
  const output = [];
  // for each set of questions, interate through each step and its items
  var questionNumber = 0;
  for (let [step, stepItems] of Object.entries(testQuestions)) {
    // store step and corresponding question number in stepQuestionNumbers map
    stepQuestionNumbers.set(step, questionNumber);
    // variable to store the list of possible answers
    const answers = [];
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
      `<div class="slide" id="${step}">
          <div class="question"> ${stepItems.question} </div>
          <div class="answers"> ${answers.join("")} </div>
        </div>`
    );
    questionNumber++;
  }
  // add an 'end of quiz' slide
  output.push(
    `<div class="slide" id="end-slide">
        <h1> You've reached the end of the quiz! </h1>
        <h2> You can see your results or go back to change your answers. </h2>
      </div>`
  );
  // finally combine our output list into one string of HTML and put it on the page
  quizContainer.innerHTML = output.join("");
  $("body").css("visibility", "visible");
}

/*
 * This function first checks whether the user picked "yes" or "no" as their choice
 * for each question. Based on their choice, we add the careers under that choice into a
 * hashmap, and increment the points for the corresponding careers in the hashmap.
 */
function displayResults(testQuestions) {
  // get all answer containers
  const answerContainers = quizContainer.querySelectorAll(".answers");
  // create empty hashmap for the user's results
  let resultTracker = new Map();
  // for each question iterate through each carrer in points array...
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
  // get the highest scoring career category (we'll update this so that we send
  // the result to the server and show the appropriate results page)
  const iter = resultTracker.entries();
  var highestScoring = iter.next().value;
  function getBestCareer(value, key, resultTracker) {
    if (value > highestScoring[1]) {
      highestScoring = [key, value];
    }
  }
  resultTracker.forEach(getBestCareer);

  // send name of career to server
  $.post("/result", { bestCareer : highestScoring[0], activity: GetURLParameter("act")},
    function(data) {
        window.location.replace('/result');
        //window.location.href ='/result';
    });
}

///////////////
// VARIABLES //
///////////////
// HTML Containers and Elements
const quizContainer = document.getElementById("quiz");
const resultsContainer = document.getElementById("results");
const submitButton = document.getElementById("submit");
const previousButton = document.getElementById("previous");
const nextButton = document.getElementById("next");
const homeButton = document.getElementById("home");

// Variables
let currentStep = "step0"; // the step we are currently on
var userPath = ["step0"]; // this array keeps track of the user's pathway
var stepQuestionNumbers = new Map(); // map that keeps track of the steps and corresponsing question number
let jsonFile = "quizSteps/" + GetURLParameter("act") + ".json"; // HARDCODED: to be changed depending on the user's favorite activity

////////////////
// START QUIZ //
////////////////
$( window ).on( "load", function() {
    startQuiz(); 
});

////////////////
// PAGINATION //
////////////////
/*
 * This function shows and hides the appropriate slides and buttons depending
 * on which slide is active and which aren't.
 */
function showSlide(newStep, move) {
  // remove the end of quiz slide or current slide as active slide
  document.getElementById("end-slide").classList.remove("active-slide");
  var toRemove = document.getElementById(currentStep);
  toRemove.classList.remove("active-slide");
  // if not at the end of quiz
  if (newStep != null) {
    // assign new slide as active slide
    var newSlide = document.getElementById(newStep);
    newSlide.classList.add("active-slide");
    // update the current step
    currentStep = newStep;
  } else {
    // if the user reached the end of the quiz, remove current slide and show end of quiz slide
    var endSlide = document.getElementById("end-slide");
    endSlide.classList.add("active-slide");
  }
  if ((move === null || move === "previous") && newStep === "step0") {
    // if new slide is the first slide
    previousButton.style.display = "none";
    nextButton.style.marginLeft = "3%";
    nextButton.style.display = "inline-block";
    submitButton.style.display = "none";
  } else if (move === "next" && newStep === null) {
    // if new slide is the last slide
    previousButton.style.display = "inline-block";
    nextButton.style.display = "none";
    submitButton.style.display = "inline-block";
  } else {
    // if new slide is any slide in between
    previousButton.style.display = "inline-block";
    nextButton.style.marginLeft = "15%";
    nextButton.style.display = "inline-block";
    submitButton.style.display = "none";
  }
}

/*
 * This function takes in the step of the current question and returns the choice
 * the user picked for that question.
 */
function getChoice(givenStep) {
  const questionNumber = stepQuestionNumbers.get(givenStep);
  const answerContainers = quizContainer.querySelectorAll(".answers");
  const answerContainer = answerContainers[questionNumber];
  const selector = `input[name=question${questionNumber}]:checked`;
  const userAnswer = (answerContainer.querySelector(selector) || {}).value;
  if (userAnswer === undefined) {
    window.alert("You need to choose an option!");
    return null;
  }
  else {
    return userAnswer;
  }
}

/*
 * This function returns the next property of the current question, based
 * on the choice the user picked in this question. As of now, the choice is hardcoded.
 */
function getNext(testQuestions, currentStep, userChoice) {
  for (let [step, stepItems] of Object.entries(testQuestions)) {
    if (step === currentStep) {
      for (var option in stepItems.answers) {
        if (option === userChoice) {
          return stepItems.answers[option].next;
        }
      }
    }
  }
}

/*
 * This function shows the next slide, based on the current question and the choice
 * the user picked. If the user didn't select anything (userChoice is null), then the JSON is not fetched.
 */
function showNextSlide() {
  // get the choice the user picked for this current question
  var userChoice = getChoice(currentStep);
  if (userChoice != null) {
  //fetch JSON file to find out what the next question is, based on user choice. 
    fetch(jsonFile)
      .then(res => res.json())
      .then(output => {
        let newStep = getNext(output, currentStep, userChoice);
        userPath.push(newStep);
        showSlide(newStep, "next");
      });
  }
}

/*
 * This function shows the last slide the user saw (the last step in the
 * userPath array, which is then removed from the array).
 */
function showPreviousSlide() {
  // clear the user's choice for the current question
  var questionNumber = "question" + stepQuestionNumbers.get(currentStep);
  var answerContainer = document.getElementsByName(questionNumber);
  for (var i = 0; i < answerContainer.length; i++)
    answerContainer[i].checked = false;
  // access the last question and delete it from userPath array
  userPath.pop();
  showSlide(userPath[userPath.length - 1], "previous");
}

/////////////////////
// EVENT LISTENERS //
/////////////////////
submitButton.addEventListener("click", showResults);
previousButton.addEventListener("click", showPreviousSlide);
nextButton.addEventListener("click", showNextSlide);
homeButton.addEventListener("click", goHome);