let gamesPlayed = 0
let playerWins = 0
let computerWins = 0
const h1 = document.querySelector('h1')

function getComputerChoice() {
  let computedValue = Math.floor(Math.random() * 3) + 1
  if (computedValue === 1) {
    return 'Rock'
  } else if (computedValue === 2) {
    return 'Paper'
  } else {
    return 'Scissors'
  }
}

function singleRoundPlay(playerSelection, computerSelection) {
  if (playerSelection && computerSelection) {
    playerSelection = playerSelection.toLowerCase()
    computerSelection = computerSelection.toLowerCase()
  }

  if (playerSelection === computerSelection) return 'TIES'

  if (
    (playerSelection === 'rock' && computerSelection === 'scissors') ||
    (playerSelection === 'paper' && computerSelection === 'rock') ||
    (playerSelection === 'scissors' && computerSelection === 'paper')
  ) {
    playerWins += 1
    return `You won! ${playerSelection} beats ${computerSelection}!`
  } else {
    computerWins += 1
    return `You lose! ${computerSelection} beats ${playerSelection}!`
  }
}

function chooseWinner() {
  if (gamesPlayed === 5) {
    if (playerWins > computerWins) {
      h1.textContent = 'Player won! Congratulations!'
    } else if (playerWins < computerWins) {
      h1.textContent = 'Computer won! Congratulations!'
    } else {
      h1.textContent = 'TIES'
    }
  }
}

function game() {
  while (gamesPlayed < 5) {
    const usersValue = prompt('Rock | Paper | Scissors', '')
    gamesPlayed++

    const computedValue = getComputerChoice()

    console.log('Computers selection:', computedValue)
    console.log('Players selection', usersValue)

    console.log(singleRoundPlay(usersValue, computedValue))
  }
  console.log(chooseWinner())
}
game()
