import { React } from 'react';
import { useGlobalContext } from './Game.js';
import './Square.css'

const Square = (props) => {
    const { data, addMove } = useGlobalContext();

    if (!data) return <></>
    let p, q, r
    if (data.winner != null) {
        [p, q, r] = data.winner;
    }
    return (
        <>
            {(data.winner != null) && (p == props.i * 3 + props.j || q == props.i * 3 + props.j || r == props.i * 3 + props.j) && data.game._gameBoard[props.i][props.j] && <button className="square red-font change-background" disabled onClick={() => addMove(props.i, props.j)}> {data.game._gameBoard[props.i][props.j]} </button>}
            {(data.winner != null) && !(p == props.i * 3 + props.j || q == props.i * 3 + props.j || r == props.i * 3 + props.j) && <button className="square change-background" disabled onClick={() => addMove(props.i, props.j)}> {data.game._gameBoard[props.i][props.j]} </button>}

            {(data.winner == null) && data.game._gameBoard[props.i][props.j] && <button className="square change-background" disabled onClick={() => addMove(props.i, props.j)}> {data.game._gameBoard[props.i][props.j]} </button>}
            {(data.winner == null) && !data.game._gameBoard[props.i][props.j] && <button className="square" onClick={() => addMove(props.i, props.j)}> {data.game._gameBoard[props.i][props.j]} </button>}
        </>
    )
}

export default Square;