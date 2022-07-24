//Project 1 Part 1 - Scissors Paper Stone
//Rules: scissors beats paper, paper beats stone, and stone beats scissors. If both parties choose the same object, it's a draw.
//Input are string "scissors" "paper" "stone"
//Output would be "It is a draw" "You win" "You lose"
// Player scissors vs Computer paper = Player win
// Player scissors vs Computer stone = Player lose
// Player scissors vs Computer scissors = it is a draw
// with this, there would be total of 9 permutations

// If I assign value to them
// 1 is scissors
// 2 is paper
// 3 is stone
// when P=Player vs C=Computer
// if 1 vs 2, P win == (P-C= -1)
// if 2 vs 3, P win == (P-C= -1)
// if 3 vs 1, P win == (P-C= 2)
// if 1 vs 3, C win == (P-C= -2)
// if 2 vs 1, C win == (P-C= 1)
// if 3 vs 2, C win == (P-C= 1)
// any two number the same is draw
// based on this observation, the two generic rules could be:
// 1) If the difference between P and C is 1, the smaller number is always winner
// 2) If the difference between P and C is 2, the bigger number is always loser

// Part 2 - Win-Loss Record
// Add state to your program such that it keeps track of the number of times the user has won and the number of times the computer has won. Output this win-loss record in a format you like in the program output. You can also output the number of draws and/or each party's winning percentage if you'd like.

var playerWinCount = Number(0);
var computerWinCount = Number(0);

// Part 2 - User Name
var userName = "";

// To make this game more personal, add a feature to collect the user's name as the first input after the page loads. We can prompt the user to enter their name first by adding to the page's HTML. Once the user submits their name, the program can return output to prompt the user to start playing Scissors Paper Stone by entering one of the 3 objects. Use the user's name to personalise win-loss record and other relevant output.
var currentGameMode = "waiting for user name";

// Part 2 - Reverse game mode. User can input "reverse" to switch to reverse mode of the game, and switch it back by inputing "normal".
// by default, we set it as normal. reverseGame is "normal". It will be set as "reverse" if it is reverse.

var reverseGame = "normal";

var main = function (input) {
  var myOutputValue = "";

  // if current game mode is pending user name as input
  if (currentGameMode == "waiting for user name") {
    userName = input;
    currentGameMode = "game now";
    return `Hello ${userName}, are you ready? <br> Key in "scissors" or "paper" or "stone" to start the game with computer.`;
  } else if (currentGameMode == "game now") {
    // validate if input is valid, proceed; if not, throw an error
    var isValid = inputValid(input);
    if (isValid == true) {
      // if the input is valid

      // if user input "reverse" in the middle of the game. It will switch the game mode to reverse.
      if (input == "reverse") {
        reverseGame = "reverse";
        return (myOutputValue = `Hello ${userName}, you have turned the game into reverse mode, i.e. scissors win stone, stone wins paper, etc. <br> Please continue the game.`);
      } else if (input == "normal") {
        // if user input "normal" in the middle of the game. It will switch the game mode to normal.
        reverseGame = "normal";
        return (myOutputValue = `Hello ${userName} you have turned the game into normal mode, i.e. stone win scissors, scissors win paper, etc. <br> Please continue the game.`);
      }
      // If user is not switching the mode, can continue the game;
      myOutputValue = playSPSGame(input);
    } else {
      //input is invalid
      myOutputValue = `Ops, invalid input detected. <br><br> ${userName}, please key in "scissors", "paper" or "stone" to continue playing. <br><br> You can switch the game mode to "reverse" or "normal"`;
    }

    return (
      myOutputValue +
      `<br><br>Player won: ${playerWinCount} <br>Computer won: ${computerWinCount}
      <br>Game Mode: ${reverseGame} `
    );
  }
};

var playSPSGame = function (userInput) {
  var message = "";

  //check if the game is reverse or not

  //convert scissors, paper, stone to a number

  var player = convertStringToNumber(userInput);
  var computer = Number(randomNum());
  //find out the difference in numbers to be the input for algorithm
  var difference = Number(player - computer);

  // If the game is reverse, just turn the number value of player and computer from positive integer to negative integer. It will then fit into the formula without changing it.

  if (reverseGame == "reverse") {
    player = -player;
    computer = -computer;
  }

  message = `${userName}: ${userInput} <br> Computer: ${convertNumberToString(
    computer
  )} <br><br>`;
  // If player is same as computer, it should be a draw
  if (difference == 0) {
    message = message + "Ops...It is a draw.";
  }
  // If difference between player and computer is 1 or -1, and if player is smaller player wins, else computer wins.
  else if (difference == 1 || difference == -1) {
    if (player < computer == true) {
      message =
        message +
        `Yo, ${userName}! You have won. The computer is getting angry. Do you want to try again?`;
      // Add 1 win to player win count
      playerWinCount = playerWinCount + 1;
    } else {
      message = message + "Ops, computer won. Do not give up. Try again!";
      // Add 1 win to pc win count
      computerWinCount = computerWinCount + 1;
    }
    // If the difference between player and computer is 2 or -2, the bigger number is always win
  } else if (difference == 2 || difference == -2) {
    if (player > computer == true) {
      message =
        message +
        // Add 1 win to player win count
        `Yo, ${userName}! You have won. The computer is getting angry. Do you want to try again?`;
      // Add 1 win to player win count
      playerWinCount = playerWinCount + 1;
    } else {
      message = message + "Ops, computer won. Don not give up. Try again!";
      // Add 1 win to pc win count
      computerWinCount = computerWinCount + 1;
    }
  }

  return message;
};

// Helper function
// 1. Give a random number between 1 to 3
var randomNum = function () {
  // produces a float between 0 and 3
  var randomFloat = Math.random() * 3;
  // take off the decimal
  var resultInteger = Math.floor(randomFloat);
  // produce number range from 1 to 3
  return resultInteger + 1;
};

// Helper function
// 2. Convert from string of "scissors" "paper" "stone" to number

var convertStringToNumber = function (input) {
  var num = Number(0);
  if (input == "scissors") {
    num = 1;
  } else if (input == "paper") {
    num = 2;
  } else if (input == "stone") {
    num = 3;
  }
  return num;
};

// Helper function
// 3. Convert from number to "scissors" "paper" "stone"
// Added -1, -2, -3 as values under reverse mode
var convertNumberToString = function (input) {
  var str = "";
  if (input == 1 || input == -1) {
    str = "scissors";
  } else if (input == 2 || input == -2) {
    str = "paper";
  } else if (input == 3 || input == -3) {
    str = "stone";
  }
  return str;
};
// Helper function
// 4. Input Validation if it is always "scissors" "paper" "stone"
// added validation for "reserve" and "normal" for part 2 project
var inputValid = function (input) {
  if (
    input == "scissors" ||
    input == "paper" ||
    input == "stone" ||
    input == "reverse" ||
    input == "normal"
  ) {
    return true;
  } else {
    return false;
  }
};
