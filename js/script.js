const getRowColFromField = (field) => {
  field -= 1
  const row = Math.floor(field  / 3)
  const col = field  % 3

  return [row, col]
}

const currentTurnElement = document.getElementById('current-turn')
const currentPlayerElement = document.getElementById('current-player')
const fieldBtns = document.querySelectorAll('.field-btn')

const DomController = (() => {
  const _restartDom = () => {
    fieldBtns.forEach(btn => btn.textContent = '')
    currentTurnElement.textContent = '1'
    currentPlayerElement.textContent = `${currentPlayer().name} (${currentPlayer().symbol})`
    document.getElementById('restart-btn').remove()
  }

  const _createRestartBtn = () => {
    let btn = document.createElement('button')
    btn.textContent = 'Restart'
    btn.id = 'restart-btn'
    btn.addEventListener('click', () => {
      Board.restart()
      _restartDom()
    })

    return btn
  }

  const showRestartBtn = () => {
    currentPlayerElement.textContent = currentTurnElement.textContent = ''
    const gameInfoEl = document.getElementById('game-info')
    gameInfoEl.appendChild(_createRestartBtn())
  }

  return { showRestartBtn }
})()

const Board = (() => {
  let turn = 0

  let board = [
     [0, 0, 0],
     [0, 0, 0],
     [0, 0, 0]
   ] 

  const _isGameOver = () => {
    return _isTie() || _winner()
  }

  const _isTie = () => {
    if (_winner()) return false

    return !!!(board[0].concat(board[1]).concat(board[2]).filter(field => field === 0).length)
  } 

  const _winnerPresentIn = (field1, field2, field3) => {
    if (field1 == 0 || field2 == 0 || field3 == 0) {
      return false
    }

    return field1.symbol == field2.symbol && field2.symbol == field3.symbol
  }

  const _winner = () => {
    for (let i = 0; i < 3; i++) {
      if (_winnerPresentIn(board[i][0], board[i][1], board[i][2])) { //row
        return board[i][0]
      }
      if (_winnerPresentIn(board[0][i], board[1][i], board[2][i])) { //column
        return board[0][i]
      }
      if (i === 0 && _winnerPresentIn(board[i][i], board[i+1][i+1], board[i+2][i+2])) { //diagonal top left to bottom right
        return board[i][i]
      }
      if (i === 0 && _winnerPresentIn(board[i][2-i], board[i+1][1-i], board[i+2][i])) { //diagonal top right to bottom left
        return board[i][2-i]
      }
    }
  }

  const restart = () => {
    board = [[0 ,0, 0], [0, 0, 0], [0, 0, 0]]
    Board.turn = 0
  }
  
  const play = (player, field, fieldBtn) => {
    const [row, col] = getRowColFromField(field)

    if (board[row][col] || _isGameOver()) return

    board[row][col] = player

    fieldBtn.textContent = player.symbol
    Board.turn++

    currentTurnElement.textContent = Board.turn + 1
    currentPlayerElement.textContent = `${currentPlayer().name} (${currentPlayer().symbol})`

    _isTie() && alert('IT IS A TIE!')
    _winner() && alert(`${_winner().name} WINS!`)

    if (_isGameOver()) DomController.showRestartBtn()
  }

  return { board, turn, play, restart }
})()

const Player = (name, symbol) => {
  return { name, symbol }
}

const player1 = Player(!!!"prompt('Player 1 (X) name: ')" || 'Player 1', 'X')
const player2 = Player(!!!"prompt('Player 2 (O) name: ')"  || 'Player 2', 'O')
const currentPlayer = () => Board.turn % 2 == 0 ? player1 : player2

currentTurnElement.textContent = Board.turn + 1
currentPlayerElement.textContent = `${currentPlayer().name} (${currentPlayer().symbol})`

fieldBtns.forEach(btn => {
  btn.addEventListener('click', () => Board.play(currentPlayer(), +btn.dataset.field, btn))
})
