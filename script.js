const h1 = document.querySelector('h1')
const computer = document.getElementById('computer')
const player = document.getElementById('player')
const won = document.getElementById('won')
let gamesPlayed = 0
let playerWins = 0
let computerWins = 0

// Get computer's choice
function getComputerChoice() {
  const choices = ['Rock', 'Paper', 'Scissors']
  return choices[Math.floor(Math.random() * choices.length)]
}

// Play a single round
function playRound(playerSelection) {
  // Validate input
  if (!playerSelection) {
    return { message: 'Please enter your selection: Rock, Paper, or Scissors.' }
  }

  // Normalize input
  playerSelection = playerSelection.toLowerCase()

  // Validate player selection
  if (!['rock', 'paper', 'scissors'].includes(playerSelection)) {
    return {
      message: 'Invalid selection. Please enter Rock, Paper, or Scissors.',
    }
  }

  // Get computer selection
  const computerSelection = getComputerChoice()

  // Determine winner
  let message
  if (playerSelection === computerSelection) {
    message = "It's a tie!"
  } else if (
    (playerSelection === 'rock' && computerSelection === 'scissors') ||
    (playerSelection === 'paper' && computerSelection === 'rock') ||
    (playerSelection === 'scissors' && computerSelection === 'paper')
  ) {
    message = `You win! ${playerSelection} beats ${computerSelection}`
    playerWins++
  } else {
    message = `You lose! ${computerSelection} beats ${playerSelection}`
    computerWins++
  }

  // Update game state
  gamesPlayed++

  // Return round information
  return {
    message,
    playerSelection,
    computerSelection,
    gamesPlayed,
    playerWins,
    computerWins,
  }
}

// Update page elements
function updatePage(roundInfo) {
  computer.textContent = `Computer selection: ${roundInfo.computerSelection}`
  player.textContent = `Your selection: ${roundInfo.playerSelection}`
  won.textContent = `Round ${roundInfo.gamesPlayed}: ${roundInfo.message}`
}

function startGame() {
  gamesPlayed = 0
  playerWins = 0
  computerWins = 0
  h1.textContent = 'Rock Paper Scissors'

  // Play all five rounds
  for (let i = 0; i < 5; i++) {
    const playerSelection = prompt('Rock | Paper | Scissors', '')

    // Play round and update information
    const roundInfo = playRound(playerSelection)

    // Update page with round results
    updatePage(roundInfo)

    // Display winner after each round
    displayRoundWinner()

    // Check for winner after all rounds
    if (gamesPlayed === 5) {
      h1.textContent = declareWinner()
    }
  }
}

// Display winner after each round
function displayRoundWinner() {
  if (playerWins > computerWins) {
    alert('You won this round!')
  } else if (playerWins < computerWins) {
    alert('Computer won this round.')
  } else {
    alert("It's a tie! No winner this round.")
  }
}

// // Declare the winner
function declareWinner() {
  if (playerWins > computerWins) {
    return 'Congratulations! You won the game!'
  } else if (playerWins < computerWins) {
    return 'Better luck next time! The computer won.'
  } else {
    return "It's a tie! No winner this time."
  }
}
