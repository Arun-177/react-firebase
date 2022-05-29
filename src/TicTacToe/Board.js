import Square from "./Square";
import './Board.css'

import { useGlobalContext } from './Game.js';


const Board = () => {
    const { data, resetGame } = useGlobalContext();
    let gameBoard = data.game._gameBoard;
    let n;
    if (data.winner != null) n = data.winner[0]

    return (
        <>
            <div className="board-row">
                <Square i={0} j={0} />
                <Square i={0} j={1} />
                <Square i={0} j={2} />
            </div>
            <div className="board-row">
                <Square i={1} j={0} />
                <Square i={1} j={1} />
                <Square i={1} j={2} />
            </div>
            <div className="board-row">
                <Square i={2} j={0} />
                <Square i={2} j={1} />
                <Square i={2} j={2} />
            </div>
            {(data.winner == null && data.countMove != 9) && (data.players[1].isComputer && <h3>Your turn</h3>)}
            {(data.winner == null && data.countMove != 9) && !data.players[1].isComputer && !data.turn && <h3>Player 1 turn</h3>}
            {(data.winner == null && data.countMove != 9) && data.turn && <h3>Player 2 turn</h3>}
            {(data.winner == null && data.countMove == 9) && <h2>Draw</h2>}
            {data.winner != null && gameBoard[parseInt(n / 3)][n % 3] == data.players[0].symbol && <h3>Player 1 won</h3>}
            {data.winner != null && gameBoard[parseInt(n / 3)][n % 3] == data.players[1].symbol && !data.players[1].isComputer && <h3>Player 2 won</h3>}
            {data.winner != null && gameBoard[parseInt(n / 3)][n % 3] == data.players[1].symbol && data.players[1].isComputer && <h3>I won</h3>}

            <h2 className="cursor-pointer" onClick={() => resetGame()}>Reset Game</h2>
        </>
    )
}

export default Board;