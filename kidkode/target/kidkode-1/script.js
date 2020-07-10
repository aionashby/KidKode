const artQuestions = [
  {
    number: 0, 
    question: "Do you like playing video games?",
    answers: {
      /*store current points in a hash map so its easy to iterate over
      the points array below and add a point to that entry in the map */
      yes: {points: ["gameDev","animation", "2-dAnimation"], next:1 },
      no:  {points: ["intDesign","webDesign", "UX"], next:2 },
    },
    previous: null //since it is the first question there is no previous   
  },
    { 
        number: 1, 
        question: "Do you like making art on the computer?",
        answers: {
        yes: {points: ["gameArt","animation", "3-dAnimation"], next:3 },
        no:  {points: ["gameDev","conceptArt", "2-dAnimation"], next:4 },
        },
        previous: 0  //previous method will have to subtract point that was just added to hashmap
       
    },
];

/*this function is useful that when we update the map we can 
just call getorDefault to get the value (or 0 if the key wasn't in the map) 
without having to worry if that key was already there or not (see example below)*/

function getOrDefault(key, map) {
    let res = map.get(key); 
    if (res) {
        return res;
    }
    else {
        return 0;
    }
}
/*example here for how updating the points in a hashmap would work.
/ We would iterate through the points array in the current question's 
object and update/add each career and point value to the hashmap*/
$( document ).ready(function() {
   let resultTracker = new Map();
   let key = "gameArt";
   result.set(key, getOrDefault(key, resultTracker) + 1);
   console.log(getOrDefault(key, resultTracker));
});

  