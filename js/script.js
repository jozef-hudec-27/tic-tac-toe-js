const Board = (() => {
  let turn = 0

  let _areTheSame = (field1, field2, field3) => {
    console.log(field1, field2, field3)

    if (field1 == 0 || field2 == 0 || field3 == 0) {
      return false
    }

    return field1.symbol == field2.symbol && field2.symbol == field3.symbol
  }

  let _winner = () => {
    // diagonal top left to bottom right
    if (_areTheSame(board[0][0], board[1][1], board[2][2])) {
      return board[0][0]
    }

    // diagonal top right to bottom left
    if (_areTheSame(board[0][2], board[1][1], board[2][0])) {
      return board[0][2]
    }

    for (let i = 0; i < 3; i++) {
      // row
      if (_areTheSame(board[i][0], board[i][1], board[i][2])) {
        return board[i][0]
      }

      // column
      if (_areTheSame(board[0][i], board[1][i], board[2][i])) {
        return board[0][i]
      }
    }
  }
  
 let board = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ] 

  let play = (player, field) => {
    let row = Math.floor((field - 1) / 3), col = (field - 1) % 3
    board[row][col] = player

    if (_winner()) {
      alert(`${_winner().name} WINS!`)
    }
  }

  return { board, turn, play }
})()

const Player = (name, symbol) => {
  return { name, symbol }
}

const player1 = Player('p1', 'X')
const player2 = Player('p2', 'O')

const currentPlayer = () => Board.turn % 2 == 0 ? player1 : player2

document.querySelectorAll('.field-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    btn.textContent = currentPlayer().symbol
    Board.turn++
    Board.play(currentPlayer(), +btn.dataset.field)
  })
})
