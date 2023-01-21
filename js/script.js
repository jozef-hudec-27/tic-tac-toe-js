const Board = (() => {
  let turn = 0
  
 let board = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ] 

  return { board, turn }
})()

const Display = (() => {
  const drawBoard = () => {

  }

  return { drawBoard }
}
)()

const Player = (name, num) => {
  return { name, num }
}

document.querySelectorAll('.field-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    btn.textContent = Board.turn % 2 == 0 ? 'X' : 'O'
    Board.turn++
  })
})

// const player1 = Player(prompt('Player 1 name: '), 1)
// const player2 = Player(prompt('Player 2 name: '), 2)

Display.drawBoard()

console.log(player1, player2)