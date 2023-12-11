let h1 = document.querySelector('h1')
let buttonsSection = document.querySelector('.buttons')
let scoreComputerElement = document.querySelector('#scoreComputer')
let scorePlayerElement = document.querySelector('#scorePlayer')
let roundResultElement = document.querySelector('#won')
let computerSelectionElement = document.querySelector('#computerSelection')
let playerSelectionElement = document.querySelector('#playerSelection')
let playAgain = document.querySelector('#play-again')

// initial counters
let playerWins = 0
let computerWins = 0
let roundPlayed = 0
let maxScore = 3
let maxRounds = 5
let userChoice

playAgain.style.display = 'none' // Initially hide the playAgain button

// Add event listener for playAgain button
playAgain.addEventListener('click', () => {
  playAgain.style.display = 'none' // Hide the playAgain button again
  startGameAgain()
  updateScoreDisplay()
  h1.textContent = 'Rock Paper Scissors!'
})

// function to generate computers choice.
function getComputerSelection() {
  const options = ['Rock', 'Paper', 'Scissors']
  return options[Math.floor(Math.random() * options.length)]
}

buttonsSection.addEventListener('click', (e) => {
  if (roundPlayed < maxRounds) {
    userChoice = e.target.textContent
    playRound(userChoice)
  } else {
    determineWinner()
  }
})

function playRound(playerSelection) {
  // Validate input
  if (!playerSelection) {
    h1.textContent = 'Please choose your selection: Rock, Paper, or Scissors.'
    return
  }

  // Normalize input
  playerSelection = playerSelection ? playerSelection.toLowerCase() : ''

  const computerSelection = getComputerSelection().toLowerCase()

  // Display choices
  playerSelectionElement.textContent = `Player's selection: ${
    playerSelection[0].toUpperCase() + playerSelection.slice(1)
  }`
  computerSelectionElement.textContent = `Computer's selection: ${
    computerSelection[0].toUpperCase() + computerSelection.slice(1)
  }`

  // Determine winner
  if (playerSelection === computerSelection) {
    roundResultElement.textContent = "It's a tie!"
  } else if (
    (playerSelection === 'rock' && computerSelection === 'scissors') ||
    (playerSelection === 'paper' && computerSelection === 'rock') ||
    (playerSelection === 'scissors' && computerSelection === 'paper')
  ) {
    roundResultElement.textContent = `Player won this one! ${
      playerSelection[0].toUpperCase() + playerSelection.slice(1)
    } beats ${computerSelection[0].toUpperCase() + computerSelection.slice(1)}`
    playerWins++
  } else {
    roundResultElement.textContent = `Player lost this one! ${
      computerSelection[0].toUpperCase() + computerSelection.slice(1)
    } beats ${playerSelection[0].toUpperCase() + playerSelection.slice(1)}`
    computerWins++
  }

  // Update the score
  updateScoreDisplay()

  roundPlayed++

  if (
    playerWins === maxScore ||
    computerWins === maxScore ||
    roundPlayed === maxRounds
  ) {
    determineWinner()
  }
}

function determineWinner() {
  if (playerWins > computerWins) {
    h1.textContent = 'Player won the game!'
  } else if (playerWins < computerWins) {
    h1.textContent = 'Computer won the game!'
  } else {
    h1.textContent = "It's a tie! No winner."
  }

  playAgain.style.display = 'block' // Show the playAgain button
}

function startGameAgain() {
  playerWins = 0
  computerWins = 0
  roundPlayed = 0
}

function updateScoreDisplay() {
  scorePlayerElement.textContent = playerWins
  scoreComputerElement.textContent = computerWins
}
