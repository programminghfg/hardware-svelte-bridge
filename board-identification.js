const { get } = require("http");
const five = require("johnny-five");
var count = 0;

var getBoard = () => {
  var board = new five.Board({
    id: "A",
    repl: false,
  });

  var j5 = {};

  count++;
  console.log("getBoard x " + count);
  board.on("ready", () => {
    console.log("getBoard x " + count + " board.on");

    // Set up LED on board A
    if (board.io.firmware.name == "BoardA.ino") {
      j5.ledA = new five.Led({
        pin: 12,
        board: board,
      });
    }

    // Set up LED on board B
    else if (board.io.firmware.name == "BoardB.ino") {
      j5.ledB = new five.Led({
        pin: 13,
        board: board,
      });
    }

    if (j5.ledA) {
      // Toggle LED A every 500ms
      setInterval(function () {
        j5.ledA.toggle();
      }, 500);
    }

    if (j5.ledB) {
      // Toggle LED A every 500ms
      setInterval(function () {
        j5.ledB.toggle();
      }, 250);
    }
  });

  board.on("fail", (x) => {
    setTimeout(getBoard, 5000);
    console.log(x);
  });
};

//initialer Versuch Board zu bekommen
getBoard();

process.on("uncaughtException", function (err) {
  // Handle the error safely
  console.log("droin");
  console.log(err);
  getBoard();
});
