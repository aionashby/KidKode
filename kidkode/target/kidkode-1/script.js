const artQuestions = [
  { //store current points in a hash map so its easy to add
    number: 0, //refernce by index so we wont need this 
    question: "Do you like playing video games?",
    answers: {
      yes: {points: ["gameDev","animation", "2-dAnimation"], next:1 },
      no:  {points: ["intDesign","webDesign", "UX"], next:2 },
    },
    previous: null 
    //if yes is selected then iterate though points array and add to those value in hash map 
  },
    { 
        number: 1, 
        question: "Do you like making art on the computer?",
        answers: {
        yes: {points: ["gameArt","animation", "3-dAnimation"], next:3 },
        no:  {points: ["gameDev","conceptArt", "2-dAnimation"], next:4 },
        },
        previous: 0  //previous method will have to subtract point added
        //if yes is selected then iterate though points array and add to those value in hash map 
    },
];

//so that when we update the po
function getOrDefault(key, map) {
    let res = map.get(key); 
    if (res) {
        return res;
    }
    else {
        return 0;
    }
}

$( document ).ready(function() {
   let result = new Map();
   let key = "gameArt";
   result.set(key, getOrDefault(key, result) + 1);
   console.log(getOrDefault(key, result));
});

  