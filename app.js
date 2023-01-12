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
var hidden = false;

/* A delay function to create a delay for score updates. */
const delay = ms => new Promise(res => setTimeout(res, ms));

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


/* Takes in an integer player and computer, reprsenting either
rock, paper, or scissors. Returns the result of their selections
as a string, either win, lose, or tie. */
function playRound(player, computer) {
    switch(matrix[player][computer]) {
        case "Tie":
            return `Tie! Player chose ${convertInt(player)} and Computer chose ${convertInt(computer)}.`;
        case "Player":
            playerWins++;
            document.getElementById("p-score").innerHTML = playerWins;
            return `Player wins! ${convertInt(player)} beats ${convertInt(computer)}.`;
        case "Computer":
            computerWins++;
            document.getElementById("opp-score").innerHTML = computerWins;
            return `Computer wins! ${convertInt(computer)} beats ${convertInt(player)}.`;
        default:
            throw new Error("Error in playRound function.");
    }
}

/** Starts the game session. The start button is hidden until 5 rounds are won
 * by either the player or computer. */
document.getElementById("start-game").addEventListener("click", () => {
    if (!hidden) {
        hidden = true;
        playerWins = 0;
        computerWins = 0;
        document.getElementById('start-game').style.visibility = 'hidden';
    }
}
);
/** Selects either rock, paper, or scissors as the player's move. Activates
 * when the player clicks one of the images of either rock, paper, or scissors. */
document.getElementById("paper").addEventListener("click", async () => main(0));
document.getElementById("rock").addEventListener("click", async () => main(1));
document.getElementById("scissors").addEventListener("click", async () => main(2));

/** Takes in a playerChoice and makes a move in the game. The computer selects an option.
 * The score is updated after each move. Once either the player or computer wins 5 rounds,
 *  the game finishes and the score is set back to 0 for both players. The start button
 *  appears again. */
async function main(playerChoice) {
    if (hidden && playerWins != 5 && computerWins != 5) {
    let computerChoice = getComputerChoice();
    alert(playRound(playerChoice, computerChoice));
    } 
    await delay(2000);
    if (playerWins == 5 || computerWins == 5) {
        if (playerWins == 5) {
            alert(`Player wins!`);
        } else {
            alert(`Computer Wins!`);
        }
        hidden = false;
        document.getElementById('start-game').style.visibility = 'visible';
        playerWins = 0;
        computerWins = 0;
        document.getElementById("opp-score").innerHTML = 0;
        document.getElementById("p-score").innerHTML = 0;
    }
}
