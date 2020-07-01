// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * Adds a random greeting to the page.
 */
function addRandomGreeting() {
  const greetings =
      ['Hello world!', '¡Hola Mundo!', '你好，世界！', 'Bonjour le monde!'];

  // Pick a random greeting.
  const greeting = greetings[Math.floor(Math.random() * greetings.length)];

  // Add it to the page.
  const greetingContainer = document.getElementById('greeting-container');
  greetingContainer.innerText = greeting;
}
/**
 * Adds a random fact to the page.
 */
function addRandomFact() {
    const facts = 
        ['I am interning at JPMorgan Chase this summer!', 
        'I am the Secretary of my schools National Society of Black Engineers Chapter.', 
        "I am the Corporate Relations Director for my school's Society of Women Engineers Chapter.",
        'I am a Rewriting the Code Fellow.', 
        'I am an academic excellence workshop facilitator for Object-Oriented Programming and Data Structures.', 
        'I am a tutor for Object-Oriented Programming and Data Structures.',
        'My favorite coding language is Java!'];

    // Pick a random fact.
    const fact = facts[Math.floor(Math.random() * facts.length)];

    // Add fact to the page.
    const factContainer = document.getElementById('fact-container');
    factContainer.innerText = fact;
}

/**
 * Adds a random quote of the day to the page.
 */
 function addRandomQuote() {
     const quotes = 
     ['Every moment is a fresh beginning. – T.S Eliot',
     'Die with memories, not dreams. – Unknown',
     'Whatever you do, do it well. – Walt Disney',
     'If I’m gonna tell a real story, I’m gonna start with my name. – Kendrick Lamar'];

    //Pick a random quote.
    const quote = quotes[Math.floor(Math.random()* quotes.length)];

    //Add quote to page.
    const quoteContainer = document.getElementById('quote-container');
    quoteContainer.innerText = quote;

    addTypewriterEffect();
    getComments();
 }

 /**
  * Adds a typewriter effect to text.
  */
var i = 0;
var txt = 'Aion Ashby\'s Portfolio';
var speed = 150;

function addTypewriterEffect() {
  if (i < txt.length) {
    document.getElementById("title").innerHTML += txt.charAt(i);
    i++;
    setTimeout(addTypewriterEffect, speed);
  }
}

// /**
//  * Adds photos to the page.
//  */
// var accFam = 0;
// var accFriends = 0;

// function photos() {
//     const picturesFam = 
//     ['/images/parents.JPG','/images/wright.JPG','/images/wedding.jpg','/images/johns.jpg',
//     '/images/fam.JPG','/images/dad.JPG','/images/cousins.jpg','/images/beyonce.JPG','/images/alli.jpg'];

//     const picturesFriends =
//     ['/images/friends.JPG', '/images/cali.JPG', '/images/brooklyn.jpg','/images/arm.jpg','/images/f1.JPG',
//     '/images/hacakthon.JPG','/images/homecoming.jpg','/images/niagara.JPG'];

//     const imgElementFam = document.createElement('img');
//     if (accFam == picturesFam.length) {
//         accFam = 0; 
//     }
//     imgElementFam.src = picturesFam[accFam];
//     imgElementFam.style = "width:300px;height:300px;object-fit:cover";
//     accFam++;
//     const imageContainerFam = document.getElementById('picture-fam-container');

//     // Remove the previous image.
//     imageContainerFam.innerHTML = '';
//     imageContainerFam.appendChild(imgElementFam);

//     const imgElementFriends = document.createElement('img');
//     if (accFriends == picturesFriends.length) {
//         accFriends = 0; 
//     }
//     imgElementFriends.src = picturesFriends[accFriends];
//     imgElementFriends.style = "width:300px;height:300px;object-fit:cover";
//     accFriends++;
//     const imageContainerFriends = document.getElementById('picture-friends-container');

//     // Remove the previous image.
//     imageContainerFriends.innerHTML = '';
//     imageContainerFriends.appendChild(imgElementFriends);


// }


function getComments() {
//   const response = await fetch('/data');
//   const statement = await response.text();
//   console.log('Fetching  statement ' + statement);
//   document.getElementById('name-container').innerText = statement;
  fetch('/data').then(response => response.json()).then((comms) => {
    const commentListElement = document.getElementById('comment-list');
    comms.forEach((c) => {
        commentListElement.appendChild(createListElement(c));
    });
  });
}

function createListElement(text) {
  const liElement = document.createElement('li');
  liElement.innerText = text;
  return liElement;
}
  