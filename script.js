var gamePattern = [];

var userClickedPattern = [];

var buttonColours = ["red","blue","green","yellow"];

var level = 0;

var started = false;

//Random sequence function
function nextSequence() {

  userClickedPattern = [];

  level++;

  $("h1").text("Level " + level);

  var randomNumber = Math.floor(Math.random()*4);

  var randomChosenColour = buttonColours[randomNumber];
  
  gamePattern.push(randomChosenColour);
 
  $("#"+randomChosenColour).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);

}
 

//keyboard pressed function
$(document).keydown(function() {
  if(!started) {
    $("h1").text("Level " + level);
    nextSequence();
    started = true;
  }
});


//Button Pressed function
$(".btn").click(function () {
var userChosenColour= $(this).attr("id");
userClickedPattern.push(userChosenColour);
playSound(userChosenColour);
animatePress(userChosenColour);
checkAnswer(userClickedPattern.length-1);
});


//Play sound function
function playSound(name) {

switch (name) { 
  case "red": var red = new Audio("sounds/red.mp3");
  red.play();
  break;
  
  case "blue": var blue = new Audio("sounds/blue.mp3");
  blue.play();
  break;
    
  case "green" :var green = new Audio("sounds/green.mp3");
  green.play();
  break;

  case "yellow": var yellow = new Audio("sounds/yellow.mp3");
  yellow.play();
  break;
}
}

//animate press function
function animatePress(userChosenColour) {
  $("#"+userChosenColour).addClass("pressed");

  setTimeout(function () {
    $("#"+userChosenColour).removeClass("pressed");
  },100);
}

// answer checking function
function checkAnswer(currentLevel) {
   if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      },1000);
    }
   } else {
    
    $("body").addClass("game-over");

    var wrong = new Audio("sounds/wrong.mp3");
    wrong.play();

    setTimeout(function () {
      $("body").removeClass("game-over");
    },200);

    $("h1").text("Game Over, Press Any Key to Restart");

    startOver();
   }
}

//Start-over function
function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  started = false;
}

