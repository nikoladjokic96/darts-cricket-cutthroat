document.getElementsByClassName('svg-container')[0].onclick = onHandleClick

// Define the players and their scores
let players = {
  'Player 1': {
    20: 0,
    19: 0,
    18: 0,
    17: 0,
    16: 0,
    15: 0,
    50: 0,
  },
  'Player 2': {
    20: 0,
    19: 0,
    18: 0,
    17: 0,
    16: 0,
    15: 0,
    50: 0,
  },
}

// Define the current player
let currentPlayer = 'Player 1'

// Define the cutoff score for each number
let cutoffScore = {
  20: 3,
  19: 3,
  18: 3,
  17: 3,
  16: 3,
  15: 3,
  50: 3,
}

const options = {
  t: 3,
  d: 2,
  s: 1,
}
let darts = 3
let rounds = 9
let counter = 0
let finalScoreP1 = 0
let finalScoreP2 = 0

function updateFinalScore(points) {
  if (currentPlayer === 'Player 1') {
    finalScoreP2 += points
  } else {
    finalScoreP1 += points
  }
}
function resetStats() {
  currentPlayer = 'Player 1'
  darts = 4
  rounds = 1
  counter = 0
  finalScoreP1 = 0
  finalScoreP2 = 0
  players = {
    'Player 1': {
      20: 0,
      19: 0,
      18: 0,
      17: 0,
      16: 0,
      15: 0,
      50: 0,
    },
    'Player 2': {
      20: 0,
      19: 0,
      18: 0,
      17: 0,
      16: 0,
      15: 0,
      50: 0,
    },
  }
}

function showWinner(isAllClosed) {
  if (isAllClosed) {
    if (confirm(`${currentPlayer} wins!`) == true) {
      resetStats()
    } else {
      alert('Thank you for playing!')
      resetStats()
    }
  }
  let winner = ''
  if (finalScoreP1 > finalScoreP2) {
    winner = 'Player 2 wins!'
  } else if (finalScoreP2 > finalScoreP1) {
    winner = 'Player 1 wins!'
  } else {
    winner = "It's a tie!"
  }
  if (confirm(winner) == true) {
    resetStats()
  } else {
    alert('Thank you for playing!')
    resetStats()
  }
}

function onHandleClick(event) {
  const selectedValue = event.target.id.substring(1)
  const multiplier = event.target.id.charAt(0)
  updateScore(selectedValue, options[multiplier])
  updateFinalScore(selectedValue * options[multiplier])
  counter++
  if (counter === 6) {
    counter = 0
    rounds++
    if (rounds === 10) showWinner(false)
  }
  darts--
  if (darts === 0) {
    darts = 3
    switchPlayers()
  }
  // Display the scoreboard
  displayScoreboard()
}

// Define the function to update the score
function updateScore(number, score) {
  if (players[currentPlayer][number] === 'X') {
    //return updateFinalScore(number * score)
  }
  // Check if the number is valid
  if (players[currentPlayer][number] !== undefined) {
    // Update the score for the current player
    players[currentPlayer][number] += score

    // Check if the cutoff score has been reached
    if (players[currentPlayer][number] >= cutoffScore[number]) {
      // If the cutoff score has been reached, mark the number as closed
      players[currentPlayer][number] = 'X'
      let isAllClosed = Object.values(players[currentPlayer]).every(
        (value) => value === 'X'
      )
      if (isAllClosed) {
        return showWinner(isAllClosed)
      }
    }
  }
}

// Define the function to switch players
function switchPlayers() {
  // Switch the current player
  currentPlayer = currentPlayer === 'Player 1' ? 'Player 2' : 'Player 1'
}
// Define the function to display the scoreboard
function displayScoreboard() {
  const playersList = Object.keys(players)
  const scoreboardDiv = document.querySelector('.scoreboard')
  scoreboardDiv.innerHTML = null
  const scoresDiv = playersList.map((player) => {
    const newDiv = document.createElement('div')
    newDiv.className = 'score-header'
    const playerHeader = document.createElement('h2')
    const headerName = document.createTextNode(player)
    const finalScore = document.createElement('h2')
    const final = document.createTextNode(
      player === 'Player 1'
        ? `Score: ${finalScoreP1}`
        : `Score: ${finalScoreP2}`
    )
    finalScore.appendChild(final)
    newDiv.appendChild(finalScore)
    playerHeader.appendChild(headerName)
    newDiv.appendChild(playerHeader)
    scoreboardDiv.appendChild(newDiv)
    return Object.keys(players[player]).forEach((item) => {
      const value = players[player][item]
      const scoreEl = document.createElement('div')
      scoreEl.className = 'element'
      const scoreText = document.createTextNode(item + ':' + value)
      scoreEl.appendChild(scoreText)
      scoreboardDiv.appendChild(scoreEl)
    })
  })
  document.querySelector('.round').innerHTML = `Round: ${rounds}`
  document.querySelector('.darts').innerHTML = `Remaining darts: ${darts}`
  document.querySelector('.turn').innerHTML = `Turn: ${currentPlayer}`
}

// Start the game
displayScoreboard()
