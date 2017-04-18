var count = 0;
var colorSelection = ["#blue", "#red", "#orange", "#green"];
var demandColors = [];
var playerColors = [];
var errorRedo = false;

var blueSound = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3");
var redSound = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3");
var orangeSound = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3");
var greenSound = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3");

$("#reset").click(function(){
  newGame();
});

function newGame() {
  resetGame();
}

function resetGame() {
  demandColors = [];
  count = 0;
  startCount();
}

function startCount() {
  
  count++;
  $("#clickNum").addClass("animated fadeOut");

  //once count fades out, delcare interval tiome to bring back count display
  //about 200 milliseconds of "time out" before count comesback with the updated count number
  setTimeout(function() {
    $("#clickNum").removeClass("fadeOut").html(count).addClass("fadeIn");
  }, 200);

  setNextMove();
}

function setNextMove() {
  var next = (Math.random() * 4).toFixed();
  demandColors.push(colorSelection[next]);
  showNextMove();
}

//next move is already made, now time to output it!

//daisy-chaining functions...

function showNextMove() {
  //console.log("working");
  var i = 0;
  var reqMove = setInterval(function() {

    executeSimon(demandColors[i]);
    i++;

    //cancels repeated action which was setup using setInterval
    //outputs the colors you needed with an interval in between

    if (i >= demandColors.length) {
      clearInterval(reqMove);
      //console.log("working3");
    }

  }, 600);
  
  //console.log("working1");

  resetPlayer();
}

//highlights the button that you need next

function executeSimon(buttonNeed) {
  
  $(buttonNeed).addClass("hover");
  sound(buttonNeed);
  setTimeout(function() {
    $(buttonNeed).removeClass("hover");
  }, 350);
  //console.log("working2");
}

function resetPlayer() {
  playerColors = [];
}

$("#blue").click(function(){

  var buttonNeed = "#" + $(this).attr("id");
  console.log(buttonNeed);

  //stores the latest playerColors in the array
  playerColors.push(buttonNeed);
  playerTurn(buttonNeed);
  
});

$("#red").click(function(){

  var buttonNeed = "#" + $(this).attr("id");
  console.log(buttonNeed);

  //stores the latest playerColors in the array
  playerColors.push(buttonNeed);
  playerTurn(buttonNeed);
  
});

$("#orange").click(function(){

  var buttonNeed = "#" + $(this).attr("id");
  console.log(buttonNeed);

  //stores the latest playerColors in the array
  playerColors.push(buttonNeed);
  playerTurn(buttonNeed);
  
});

$("#green").click(function(){

  var buttonNeed = "#" + $(this).attr("id");
  console.log(buttonNeed);

  //stores the latest playerColors in the array
  playerColors.push(buttonNeed);
  playerTurn(buttonNeed);
  
});

function playerTurn(data) {

  //check if latest demandColors and playerColors are the same value, if not, reset the game
  if (playerColors[playerColors.length - 1] !== demandColors[playerColors.length - 1]) {
    alert("Wrong color, reset game!");
    newGame();
  } else {
    sound(data);
    var sameCheck = playerColors.length === demandColors.length;
    if (sameCheck === true) {
      if (count === 15) {
        alert("You've beaten the game! Congratulations");
      } else {
        alert("Onwards, more colors!");
        startCount();
      }
    }

  }

}

function sound(name) {
  switch (name) {

    case '#blue':
      blueSound.play();
      break;
    case '#red':
      redSound.play();
      break;
    case '#orange':
      orangeSound.play();
      break;
    case '#green':
      greenSound.play();
      break;
  };
}

newGame();