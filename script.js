const elements = {
  h1: document.querySelector('h1'),
  buttonsSection: document.querySelector('.buttons'),
  scoreComputerElement: document.querySelector('#scoreComputer'),
  scorePlayerElement: document.querySelector('#scorePlayer'),
  roundResultElement: document.querySelector('#won'),
  computerSelectionElement: document.querySelector('#computerSelection'),
  playerSelectionElement: document.querySelector('#playerSelection'),
  playAgain: document.querySelector('#play-again'),
  roundResult: document.querySelector('#round-result'),
}

// Initial counters
let gameInProgress = true
let playerWins = 0
let computerWins = 0
let roundPlayed = 0
const maxScore = 3
const maxRounds = 5
let userChoice

elements.buttonsSection.classList.add('button-container')

// Add event listener for playAgain button
elements.playAgain.addEventListener('click', () => {
  elements.playAgain.style.display = 'none'
  startGameAgain()
  updateScoreDisplay()
  elements.h1.textContent = 'Rock Paper Scissors!'
  gameInProgress = true // Enable the buttons for the new game
})

elements.playAgain.addEventListener('click', () => {
  elements.playAgain.removeAttribute('style')
  elements.playAgain.style.display = 'none'
})

// Function to generate computer's choice
function getComputerSelection() {
  const options = ['Rock', 'Paper', 'Scissors']
  return options[Math.floor(Math.random() * options.length)]
}

// Check if maxRounds played and lock buttons
elements.buttonsSection.addEventListener('click', (e) => {
  if (gameInProgress && roundPlayed < maxRounds) {
    userChoice = e.target.textContent
    playRound(userChoice)
  } else {
    determineWinner()
  }
})

function playRound(playerSelection) {
  elements.playerSelectionElement.textContent = ''
  elements.computerSelectionElement.textContent = ''

  // Validate input
  if (!playerSelection) {
    elements.h1.textContent =
      'Please choose your selection: Rock, Paper, or Scissors.'
    return
  }
  if (playerSelection.toLowerCase() === 'play again!') {
    return
  }

  // Normalize input
  playerSelection = playerSelection ? playerSelection.toLowerCase() : ''

  const computerSelection = getComputerSelection().toLowerCase()

  // Display choices
  displaySelection(
    elements.playerSelectionElement,
    "Player's selection",
    playerSelection
  )
  displaySelection(
    elements.computerSelectionElement,
    "Computer's selection",
    computerSelection
  )

  // Determine winner
  determineRoundWinner(playerSelection, computerSelection)

  // Update the score
  updateScoreDisplay()
  elements.roundResult.textContent = `Round result: ${elements.roundResultElement.textContent}`
  roundPlayed++

  if (
    playerWins === maxScore ||
    computerWins === maxScore ||
    roundPlayed === maxRounds
  ) {
    determineWinner()
  }
}

function determineRoundWinner(playerSelection, computerSelection) {
  if (playerSelection === computerSelection) {
    elements.roundResultElement.textContent = "It's a tie!"
  } else if (
    (playerSelection === 'rock' && computerSelection === 'scissors') ||
    (playerSelection === 'paper' && computerSelection === 'rock') ||
    (playerSelection === 'scissors' && computerSelection === 'paper')
  ) {
    elements.roundResultElement.textContent = `Player won this one! ${capitalizeFirstLetter(
      playerSelection
    )} beats ${capitalizeFirstLetter(computerSelection)}`
    playerWins++
  } else {
    elements.roundResultElement.textContent = `Player lost this one! ${capitalizeFirstLetter(
      computerSelection
    )} beats ${capitalizeFirstLetter(playerSelection)}`
    computerWins++
  }
}

function displaySelection(element, label, selection) {
  element.textContent = `${label}: ${capitalizeFirstLetter(selection)}`
}

function determineWinner() {
  if (playerWins > computerWins) {
    elements.h1.textContent = 'Player won the game!'
  } else if (playerWins < computerWins) {
    elements.h1.textContent = 'Computer won the game!'
  } else {
    elements.h1.textContent = "It's a tie! No winner."
  }

  elements.playAgain.style.display = 'block'
  gameInProgress = false
  elements.buttonsSection.classList.add('game-over')
}

function startGameAgain() {
  playerWins = 0
  computerWins = 0
  roundPlayed = 0
  gameInProgress = true // Set gameInProgress to true for the new game
  elements.buttonsSection.classList.remove('game-over')

  // Reset selections
  elements.playerSelectionElement.textContent = ''
  elements.computerSelectionElement.textContent = ''

  // Clear the round result, including "Round result:" string
  elements.roundResultElement.textContent = ''

  // Update the score display
  updateScoreDisplay()

  // Enable or disable buttons based on the game status
  elements.buttonsSection.classList.toggle('disabled', !gameInProgress)
  userChoice = null
  elements.playAgain.style.display = 'none'
}

function updateScoreDisplay() {
  elements.scorePlayerElement.textContent = playerWins
  elements.scoreComputerElement.textContent = computerWins
}

function capitalizeFirstLetter(str) {
  return str[0].toUpperCase() + str.slice(1)
}
