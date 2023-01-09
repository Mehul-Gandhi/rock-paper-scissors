/** Use a matrix to select the winner where the row represents the computer's choice
 * and the column reprsents the player choice.
 */
const matrix = [["Tie", "Computer", "Player"],
            ["Player", "Tie", "Computer"],
            ["Computer", "Player", "Tie"]
];
/* Stores the number of wins in the current game session*/
var playerWins;
var computerWins;

/* Returns a random integer between min and max inclusive. */
function getComputerChoice() {
    var choice = Math.floor(Math.random() * 3);
    return choice;
}

/** Takes in a string choice and converts the string to an integer. */
function convertString(choice) {
    switch(choice) {
        case "paper":
            return 0;
        case "rock":
            return 1;
        case "scissors":
            return 2;
        default:
            throw new Error("Invalid input in function convertString");
    }
}

/** Takes in an integer and converts the integer to a string. */
function convertInt(choice) {
    switch(choice) {
        case 0:
            return "paper";
        case 1:
            return "rock";
        case 2:
            return "scissors";
        default:
            throw new Error("Invalid input in function convertInt");
    }
}

/** Selects either rock, paper, or scissors as the player's move.
 * Returns the string. */
function playerSelection() {
    var valid_choices = ["rock", "paper", "scissors"];
    var choice = prompt("Rock, paper, or scissors?").toLowerCase();
    while (!valid_choices.includes(choice)) {
        alert("Please pick either rock, paper, or scissors");
        choice = prompt("Rock, paper, or scissors?").toLowerCase();
    }
    return convertString(choice);
}

/* Takes in an integer player and computer, reprsenting either
rock, paper, or scissors. Returns the result of their selections
as a string, either win, lose, or tie. */
function playRound(player, computer) {
    switch(matrix[player][computer]) {
        case "Tie":
            return `Tie! Player chose ${convertInt(player)} and Computer chose ${convertInt(computer)}.`;
        case "Player":
            playerWins++;
            return `Player wins! ${convertInt(player)} beats ${convertInt(computer)}.`;
        case "Computer":
            computerWins++;
            return `Computer wins! ${convertInt(computer)} beats ${convertInt(player)}.`;
        default:
            throw new Error("Error in playRound function.");
    }
}

/** Main function that plays 5 rounds of rock, paper, scissors. Best of 5 wins. */
function main() {
    playerWins = 0;
    computerWins = 0;
    for (let i = 0; i < 5; i++) {
        let playerChoice = playerSelection();
        let computerChoice = getComputerChoice();
        console.log(playRound(playerChoice, computerChoice));
    }
    if (playerWins > computerWins) {
        console.log(`Player wins! Player Score: ${playerWins} Computer Score: ${computerWins}`);
    }
    else {
        console.log(`Computer wins! Computer Score: ${computerWins} Player Score: ${playerWins}`);
    }
}
