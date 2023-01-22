const Player = (name, symbol) => {
  return { name, symbol }
}

const Game = (() => {
  const player1 = Player(!!!"prompt('Player 1 (X) name: ')" || 'Player 1', 'X')
  const player2 = Player(!!!"prompt('Player 2 (O) name: ')"  || 'Player 2', 'O')

  const currentPlayer = () => {
    return Board.turn % 2 == 0 ? player1 : player2
  }

  const initialize = () => {
    Dom.updateGameInfo()

    Dom.fieldBtns.forEach(btn => {
      btn.addEventListener('click', () => Board.play(currentPlayer(), +btn.dataset.field, btn))
    })
  }

  return { currentPlayer, initialize }
})()

const Dom = (() => {
  const currentTurnEl = document.getElementById('current-turn')
  const currentPlayerEl = document.getElementById('current-player')
  const fieldBtns = document.querySelectorAll('.field-btn')

  const X_svgIconHtml = `
      <svg width="128" height="128">
        <g stroke-width="3">
          <path d="m15,102c1,0 1.31001,-0.33749 4,-2c1.203,-0.7435 1.18601,-1.69255 3,-3c1.14727,-0.8269 1,-3 2,-4c1,-1 1.09789,-2.82443 3,-4c0.85065,-0.52573 2.82443,-0.09789 4,-2c1.05146,-1.7013 2,-2 3,-3c1,-1 1.69344,-2.4588 3,-3c1.84776,-0.76537 2.85273,-3.1731 4,-4c1.81399,-1.30745 1.90633,-1.1034 3,-2c2.78833,-2.28588 1.19577,-3.64886 5,-6c1.7013,-1.05146 2.61105,0.07193 5,-2c1.68925,-1.46507 3.41886,-2.41886 5,-4c1.58114,-1.58114 4,-2 6,-4c2,-2 3.13464,-3.81145 6,-6c2.51308,-1.91948 4.31001,-2.33749 7,-4c1.203,-0.7435 4.186,-2.69255 6,-4c1.14727,-0.8269 5.29869,-2.82108 7,-6c0.94372,-1.76335 2.76935,-4.30322 4,-5c3.58793,-2.03145 3.70546,-2.34619 6,-4c1.814,-1.30745 4,-2 6,-4c2,-2 4.31001,-3.33749 7,-5c1.203,-0.7435 3.58578,-1.58579 5,-3c0.70711,-0.70711 1.82443,-1.09789 3,-3c0.52573,-0.85065 1,-1 1,-2l0,0" id="svg_6" stroke="white" fill="none"/>
          <path d="m15,12c0,0 0.85273,1.17309 2,2c1.81399,1.30745 1.69344,2.4588 3,3c0.92388,0.38268 2.61732,2.07612 3,3c0.5412,1.30656 1.47427,2.14935 2,3c1.17557,1.90211 2.07612,1.61732 3,2c1.30656,0.5412 2.29289,1.29289 3,2c0.70711,0.70711 1.07612,1.61732 2,2c1.30656,0.5412 2,2 2,3c0,1 0.69344,1.45881 2,2c0.92388,0.38268 0.69344,1.45881 2,2c0.92388,0.38268 1,1 2,1c1,0 1.45881,0.69344 2,2c0.38268,0.92388 0.69344,1.45881 2,2c0.92388,0.38268 1.45881,0.69344 2,2c0.38268,0.92388 2.1731,1.85273 3,3c1.30745,1.81399 2,3 3,4c2,2 3,3 4,3c1,0 0.42281,0.44805 2,3c1.17557,1.90211 2.33749,1.31001 4,4c0.7435,1.203 0.69344,1.45881 2,2c1.84776,0.76537 2,2 3,3c1,1 2,3 3,4c0,0 0,1 1,2c1,1 2.29289,1.29289 3,2c0.70711,0.70711 0,3 2,4c0,0 1.4588,0.69344 2,2c0.38268,0.92388 1.82443,1.09789 3,3c0.52573,0.85065 0.23463,1.15224 1,3c0.5412,1.30656 3.14429,1.93414 4,4c1.21015,2.92156 4.186,3.69255 6,5c1.14727,0.8269 1.69344,2.4588 3,3c0.92388,0.38268 2,1 3,2c0,0 0.69344,1.4588 2,2c0.92388,0.38268 1,0 2,0c0,0 0.07612,0.61732 1,1c1.30656,0.5412 0.69344,2.4588 2,3c0.92388,0.38268 1,0 1,1c0,1 1.4588,0.69344 2,2c0.38268,0.92388 1,1 1,1c0,0 0,1 1,1l0,0l1,1" id="svg_7" stroke="white" fill="none"/>
        </g>
      </svg>`

  const O_svgIconHtml = `
      <svg width="128" height="128">
        <g stroke-width="3">
          <path d="m73.63853,10.16851c0,-0.24096 0.01968,-0.74991 -0.96385,-1.44578c-1.41849,-1.0036 -4.06099,-2.08232 -7.95179,-2.89156c-4.30504,-0.89539 -6.98149,-0.84329 -10.36143,-0.96385c-3.61215,-0.12884 -7.90373,1.161 -11.8072,2.89156c-4.64693,2.06016 -8.82059,5.34275 -13.49395,8.91564c-4.4853,3.42912 -7.78624,7.16883 -10.84335,11.08431c-2.22438,2.84893 -3.65834,6.00393 -5.30119,9.63853c-1.7333,3.83471 -2.7141,7.21347 -3.85541,12.04817c-1.02082,4.32428 -1.80719,9.15209 -1.92771,13.97587c-0.12037,4.81776 0.23227,10.81267 0.72289,15.42165c0.45982,4.31963 1.32524,6.74134 1.44578,10.60239c0.11279,3.61269 0.57031,6.28522 0.96385,8.67468c0.52244,3.17212 1.62308,5.11695 3.13252,6.74697c1.38923,1.5002 2.98923,3.63438 4.5783,4.33734c1.81717,0.80386 3.83138,1.55485 5.78312,1.9277c3.58167,0.68424 6.50601,0.96386 10.12046,0.96386c3.37349,0 6.98793,0 10.36142,0c4.33734,0 8.24577,-0.48789 13.01202,-1.68674c5.61816,-1.41313 9.60859,-2.9594 14.4578,-5.06023c5.74875,-2.49054 11.15831,-5.07164 15.42165,-7.71082c3.02507,-1.87263 5.18985,-3.99024 6.74698,-6.02409c3.16889,-4.13905 4.78483,-7.72111 6.02408,-11.8072c1.17233,-3.86542 1.66287,-9.3998 2.16867,-14.69877c0.46021,-4.82138 0.48193,-8.43372 0.48193,-12.28913c0,-3.37349 0.20211,-6.27276 0,-8.91564c-0.24167,-3.16015 -0.82555,-6.31489 -1.9277,-9.15661c-0.85816,-2.21262 -2.12556,-4.47973 -2.89156,-6.26505c-0.99194,-2.31192 -1.59476,-4.34989 -3.13252,-6.02408c-1.63002,-1.77464 -4.22878,-3.54217 -6.02408,-4.5783c-2.52173,-1.45538 -5.286,-1.97499 -7.46986,-2.6506c-3.35175,-1.03691 -5.73669,-2.0665 -8.43372,-2.89156c-1.90012,-0.58127 -3.84541,-0.84319 -6.02409,-0.96385c-1.44357,-0.07995 -2.89156,0 -4.09638,0l-1.44578,1.20482l-0.24096,0.48193l-0.72289,0.48193" id="svg_3" stroke="white" fill="none"/>
        </g>
      </svg>`

  const _restart = () => {
    fieldBtns.forEach(btn => btn.textContent = '')
    updateGameInfo()
    document.getElementById('restart-btn').remove()
  }

  const _createRestartBtn = () => {
    let btn = document.createElement('button')
    btn.textContent = 'Restart'
    btn.id = 'restart-btn'
    btn.addEventListener('click', () => {
      Board.restart()
      _restart()
    })

    return btn
  }

  const showRestartBtn = () => {
    currentPlayerEl.textContent = currentTurnEl.textContent = ''
    const gameInfoEl = document.getElementById('game-info')
    gameInfoEl.appendChild(_createRestartBtn())
  }

  const updateGameInfo = () => {
    currentTurnEl.textContent = Board.turn + 1
    currentPlayerEl.textContent = `${Game.currentPlayer().name} (${Game.currentPlayer().symbol})`
  }

  const createSvgElFor = (player) => {
    let symbolWrapper = document.createElement('div')
    symbolWrapper.innerHTML = player.symbol === 'X' ? X_svgIconHtml : O_svgIconHtml
    symbolWrapper.querySelectorAll('path').forEach(path => {
      path.style.setProperty('stroke-dasharray', path.getTotalLength())
      path.style.setProperty('stroke-dashoffset', path.getTotalLength())
    })
    return symbolWrapper
  }

  return { showRestartBtn, updateGameInfo, currentTurnEl, currentPlayerEl, fieldBtns, createSvgElFor }
})()

const Board = (() => {
  let turn = 0

  let board = [
     [0, 0, 0],
     [0, 0, 0],
     [0, 0, 0]
   ] 

  const _getRowColFromField = (field) => {
    field -= 1
    const row = Math.floor(field  / 3)
    const col = field  % 3
  
    return [row, col]
  }

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
    const [row, col] = _getRowColFromField(field)

    if (board[row][col] || _isGameOver()) return

    board[row][col] = player

    fieldBtn.appendChild(Dom.createSvgElFor(player))

    Board.turn++

    Dom.currentTurnEl.textContent = Board.turn + 1
    Dom.currentPlayerEl.textContent = `${Game.currentPlayer().name} (${Game.currentPlayer().symbol})`

    _isTie() && alert('IT IS A TIE!')
    _winner() && alert(`${_winner().name} WINS!`)

    if (_isGameOver()) Dom.showRestartBtn()
  }

  return { board, turn, play, restart }
})()

Game.initialize()
