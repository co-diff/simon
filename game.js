var seq = [];
var userSeq = [];
var level = 0;
var started = false;
var buttonColors = ["red", "blue", "green", "yellow"];
var numClicks = 0;
var started = false;
var level = 1;

if (started === false) {
    $(document).on("keydown", function(e) {
        started = true;
        seq = [];
        $("h1").text("Level " + level);
        $("body").removeClass("game-over");
        nextSequence();
    })
}

//when a button is clicked,
$(".btn").click(function (e) {
  var colorClicked = e.target.id;
  userSeq.push(colorClicked);
  $("#" + colorClicked)
          .fadeOut(50)
          .fadeIn(50);

  if (numClicks < seq.length) {
    if (userSeq[numClicks] === seq[numClicks]) {
        playSound(colorClicked);
    } 
    // game is over, reset values and change title
    else {
      $("h1").text("Game Over! Press any key to continue");
      $("h1").css("fontSize", "2rem");
      playSound("wrong");
      $("body").addClass("game-over");
      numClicks = -1;
      seq = [];
      started = false;
      level = 1;
    }
  }
  numClicks++;

  // if number of clicks equals the sequence length, go to next sequence. Put in delay so sounds don't overlap
  if (numClicks === seq.length && started === true) {
    setTimeout(function() {
        nextSequence();
        level++;
        $("h1").text("Level " +level);
    }, 1000)
  }
});

//functions

function nextSequence() {
  var ranNum = Math.floor(Math.random() * 4);
  var ranColor = buttonColors[ranNum];
  seq.push(ranColor);

  for (var i = 0; i < seq.length; i++) {
    (function (i) {
      setTimeout(function () {
        $("#" + seq[i])
          .fadeOut(50)
          .fadeIn(50);
        playSound(seq[i]);
      }, i * 1000);
    })(i);
  }

  numClicks = 0;
  userSeq = [];
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}


