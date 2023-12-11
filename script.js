let h1 = document.querySelector('h1')
let buttonsSection = document.querySelector('.buttons')
let scoreComputerElement = document.querySelector('#scoreComputer')
let scorePlayerElement = document.querySelector('#scorePlayer')
let roundResultElement = document.querySelector('#won')
let computerSelectionElement = document.querySelector('#computerSelection')
let playerSelectionElement = document.querySelector('#playerSelection')
let playAgain = document.querySelector('#play-again')
let roundResult = document.querySelector('#round-result')

// initial counters
let gameInProgress = true
let playerWins = 0
let computerWins = 0
let roundPlayed = 0
let maxScore = 3
let maxRounds = 5
let userChoice

buttonsSection.classList.add('button-container')

// Add event listener for playAgain button
playAgain.addEventListener('click', () => {
  startGameAgain()
  updateScoreDisplay()
  h1.textContent = 'Rock Paper Scissors!'
  gameInProgress = true // Enable the buttons for the new game
})

// function to generate computers choice.
function getComputerSelection() {
  const options = ['Rock', 'Paper', 'Scissors']
  return options[Math.floor(Math.random() * options.length)]
}

// check if maxRounds played and lock buttons
buttonsSection.addEventListener('click', (e) => {
  if (gameInProgress && roundPlayed < maxRounds) {
    userChoice = e.target.textContent
    playRound(userChoice)
  } else {
    determineWinner()
  }
})

function playRound(playerSelection) {
  playerSelectionElement.textContent = ''
  computerSelectionElement.textContent = ''

  // Validate input
  if (!playerSelection) {
    h1.textContent = 'Please choose your selection: Rock, Paper, or Scissors.'
    return
  }
  if (playerSelection.toLowerCase() === 'play again!') {
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
  roundResult.textContent = `Round result: ${roundResultElement.textContent}`
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

  playAgain.style.display = 'block'
  gameInProgress = false
  buttonsSection.classList.add('game-over')
}

function startGameAgain() {
  playerWins = 0
  computerWins = 0
  roundPlayed = 0
  gameInProgress = true
  buttonsSection.classList.remove('game-over')

  // Reset selections
  playerSelectionElement.textContent = ''
  computerSelectionElement.textContent = ''

  // Clear the round result, including "Round result:" string
  roundResult.textContent = ''

  // Update the score display
  updateScoreDisplay()
}

function updateScoreDisplay() {
  scorePlayerElement.textContent = playerWins
  scoreComputerElement.textContent = computerWins
}
