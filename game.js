var userClickedPattern = [];
var gamePattern = [];
var buttonColors = ["red" , "blue" , "green" , "yellow"];
let level = 0;
var started = 0;
// Detecting a key press :
$(document).keypress(CallFunction);
function CallFunction() {
  if(started === 0) {
    nextSequence();
    started = 1;
  }
}
$(".btn").click(HandlerFunction);
function HandlerFunction(){
  //var userChosenColor = this.id;  used to store the id of the button clicked // using Vanilla Js
  var userChosenColor = $(this).attr("id"); // using Jquery
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
}

function nextSequence() {
  userClickedPattern = []; // Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
  level = level + 1;
  $("h1").text("Level " + level);
  var n = Math.random() * 4;
  var randomNumber = Math.floor(n); // this will generate a random number
  var randomChosenColor = buttonColors[randomNumber]; // with the help of this we will choose a random color
  gamePattern.push(randomChosenColor); // now we will puch that random choosen color to the end to create a sequence

  $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100); // this will generally flash the button
  // .fadeOut(100) : fades the element out for over 100 milliseconds
  // .fadeIn(100) : fades in (visible) for over 100 milliseconds
  // this repeats for the next two instructions generally creating a flash animation

  playSound(randomChosenColor);
  animatePress(randomChosenColor);
}
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
setTimeout(function() {$("#" + currentColor).removeClass("pressed");} , 100); // this will remove class after 100 milliseconds
}
function startOver() {
  level = 0;
  started = 0;
  gamePattern = [];
}
function checkAnswer(currentLevel) {
// Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
// If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {nextSequence();} , 1000);
    }
  } else {
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function() {$("body").removeClass("game-over");} , 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}
