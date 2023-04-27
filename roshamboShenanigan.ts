let hands: string[] = ["rock", "paper", "scissors"];

let player1Score: number = 0; //initialize player1 score
let player2Score: number = 0; //initialize player2 score

function getHand(): string {
  const hands: string[] = ["rock", "paper", "scissors"];
  return hands[Math.floor(Math.random() * 3)];
}

function playRound(player1Hand: string, player2Hand: string): string {
  let winner: string | null = null;

  if (player1Hand === player2Hand) {
    return "It's a tie.";
  } else if (
    (player1Hand === "rock" && player2Hand === "scissors") ||
    (player1Hand === "paper" && player2Hand === "rock") ||
    (player1Hand === "scissors" && player2Hand === "paper")
  ) {
    winner = "Player 1";
  } else {
    winner = "Player 2";
  }

  return winner;
}

function playGame(): void {
  let player1Name: string | null = (
    document.getElementById("player1-name") as HTMLInputElement
  ).value;
  let player2Name: string | null = (
    document.getElementById("player2-name") as HTMLInputElement
  ).value;

  if (!player1Name || !player2Name) {
    alert("Please enter names for both players.");
    return;
  }

  //retrieve scores from localStorage or set to 0
  if (localStorage.getItem("player1Score")) {
    player1Score = parseInt(localStorage.getItem("player1Score")!);
  } else {
    localStorage.setItem("player1Score", player1Score.toString());
  }
  if (localStorage.getItem("player2Score")) {
    player2Score = parseInt(localStorage.getItem("player2Score")!);
  } else {
    localStorage.setItem("player2Score", player2Score.toString());
  }

  let player1Hand: string = getHand();
  let player2Hand: string = getHand();

  let result: string = playRound(player1Hand, player2Hand);
  let resultMessage: string = "";

  if (result === "It's a tie.") {
    resultMessage = "It's a tie.";
  } else {
    resultMessage = `${
      result === "Player 1" ? player1Name : player2Name
    } wins!`;
    if (result === "Player 1") {
      player1Score++; //updates player1 score
    } else {
      player2Score++; //updates player2 score
    }
    //store updated scores in localStorage
    localStorage.setItem("player1Score", player1Score.toString());
    localStorage.setItem("player2Score", player2Score.toString());
  }

  document.getElementById(
    "result"
  )!.innerHTML = `<p>${player1Name} played ${player1Hand}.</p>
  <p>${player2Name} played ${player2Hand}.</p>
  <p>${resultMessage}</p>`;

  //display current scores in console
  console.log(`${player1Name} score: ${player1Score}`);
  console.log(`${player2Name} score: ${player2Score}`);
}
function resetScore(): void {
  // resets player1 and player2 to 0
  player1Score = 0;
  player2Score = 0;

  // store the reset scores in localStorage
  localStorage.setItem("player1Score", "0");
  localStorage.setItem("player2Score", "0");

  // display reset scores in the console
  console.log("Scores reset to 0.");
}

// Add an event listener to the reset button
const resetButton = document.getElementById("reset-button") as HTMLButtonElement;
resetButton.addEventListener("click", () => {
  resetScore();
  (document.getElementById("result") as HTMLDivElement).innerHTML = "";
  (document.getElementById("player1-name") as HTMLInputElement).value = "";
  (document.getElementById("player2-name") as HTMLInputElement).value = "";
});


// Add an event listener to the play button
const playButton = document.getElementById("play-button") as HTMLButtonElement;
playButton.addEventListener("click", () => {
  playGame();
});

