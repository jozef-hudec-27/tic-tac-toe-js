const getRowColFromField = (field) => {
  const row = Math.floor((field - 1) / 3)
  const col = (field - 1) % 3

  return [row, col]
}

const Board = (() => {
  let turn = 0

  let board = [
     [0, 0, 0],
     [0, 0, 0],
     [0, 0, 0]
   ] 

  const _isTie = () => {
    if (_winner()) return false

    return !Boolean(board[0].concat(board[1]).concat(board[2]).filter(field => field === 0).length)
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
  
  const play = (player, field, fieldBtn) => {
    const [row, col] = getRowColFromField(field)

    if (board[row][col]) return

    board[row][col] = player

    fieldBtn.textContent = player.symbol
    Board.turn++

    _isTie() && alert('IT IS A TIE!')
    _winner() &&  alert(`${_winner().name} WINS!`)
  }

  return { board, turn, play }
})()

const Player = (name, symbol) => {
  return { name, symbol }
}

const player1 = Player('p1', 'X')
const player2 = Player('p2', 'O')
const currentPlayer = () => Board.turn % 2 == 0 ? player1 : player2

const fieldBtns = document.querySelectorAll('.field-btn')
fieldBtns.forEach(btn => {
  btn.addEventListener('click', () => Board.play(currentPlayer(), +btn.dataset.field, btn))
})
