
const SYMBOLS = {
    x: 'X',
    o: 'O'
}

const RESULT = {
    incomplete: 0,
    playerXWon: SYMBOLS.x,
    playerOWon: SYMBOLS.o,
    tie: 3
}



export const getBestMove = (board, symbol) => {
    let result
    // Receives a board, and the symbol of the player who has the next move. Returns the cordinates of the move and a score for that move (1-for winning, 0 for tie, and -1 for losing)
    function copyBoard(board) {
        let copy = []
        for (let row = 0; row < 3; row++) {
            copy.push([])
            for (let column = 0; column < 3; column++) {
                copy[row][column] = board[row][column]
            }
        }
        return copy
    }

    function getAvailableMoves(board) {
        // Receives a board, and returns an array of available moves.
        let availableMoves = []
        for (let row = 0; row < 3; row++) {
            for (let column = 0; column < 3; column++) {
                if (board[row][column] === "") {
                    availableMoves.push({ row, column })
                }
            }
        }
        return availableMoves
    }

    function shuffleArray(array) {
        // shuffles the array in place
        for (var i = array.length - 1; i > 0; i--) {
            var rand = Math.floor(Math.random() * (i + 1));
            [array[i], array[rand]] = [array[rand], array[i]]
        }
    }

    let availableMoves = getAvailableMoves(board)
    let availableMovesAndScores = []
    let nextMove

    for (var i = 0; i < availableMoves.length; i++) {
        // Iterates over each available move. If it finds a winning move it returns it immediately. Otherwise it pushes a move and a score to the availableMovesAndScores array.
        let move = availableMoves[i]
        let newBoard = copyBoard(board)
        newBoard = applyMove(newBoard, move, symbol)
        result = getResult(newBoard, symbol).result
        let score
        if (result == RESULT.tie) { score = 0 }
        else if (result == symbol) {
            score = 1
        }
        else {
            let otherSymbol = (symbol == SYMBOLS.x) ? SYMBOLS.o : SYMBOLS.x
            nextMove = getBestMove(newBoard, otherSymbol)
            score = - (nextMove.score)
        }
        if (score === 1)
            return { move, score }
        availableMovesAndScores.push({ move, score })
    }

    shuffleArray(availableMovesAndScores)

    availableMovesAndScores.sort((moveA, moveB) => {
        return moveB.score - moveA.score
    })
    return availableMovesAndScores[0]
}



function moveCount(board) {
    //receives a board and returns the number of moves that have been played.
    let moveCount = 0
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j] != "") {
                moveCount++
            }
        }
    }
    return moveCount
}



function getResult(board, symbol) {
    // receives a board, and the symbol of the player and returns an object with the result and an array of the winning line
    let result = RESULT.incomplete
    if (moveCount(board) < 5) {
        return { result }
    }

    function succession(line) {
        return (line === symbol.repeat(3))
    }

    let line
    let winningLine = []

    //first we check row, then column, then diagonal
    for (var i = 0; i < 3; i++) {
        line = board[i].join('')
        if (succession(line)) {
            result = symbol;
            winningLine = [[i, 0], [i, 1], [i, 2]]
            return { result, winningLine };
        }
    }

    for (var j = 0; j < 3; j++) {
        let column = [board[0][j], board[1][j], board[2][j]]
        line = column.join('')
        if (succession(line)) {
            result = symbol
            winningLine = [[0, j], [1, j], [2, j]]
            return { result, winningLine };
        }
    }

    let diag1 = [board[0][0], board[1][1], board[2][2]]
    line = diag1.join('')
    if (succession(line)) {
        result = symbol
        winningLine = [[0, 0], [1, 1], [2, 2]]
        return { result, winningLine };
    }

    let diag2 = [board[0][2], board[1][1], board[2][0]]
    line = diag2.join('')
    if (succession(line)) {
        result = symbol
        winningLine = [[0, 2], [1, 1], [2, 0]]
        return { result, winningLine };
    }

    //Check for tie
    if (moveCount(board) == 9) {
        result = RESULT.tie
        return { result, winningLine }
    }

    return { result }
}

function applyMove(board, move, symbol) {
    board[move.row][move.column] = symbol
    return board
}


