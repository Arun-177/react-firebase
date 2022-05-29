import { useState, useContext } from "react"
import React from 'react';


import './Game.css'
import Board from "./Board";
import { getBestMove } from './MachineAlgo'

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
const VIEW = {
    question1: 1,
    question2: 2,
    game: 3,
    result: 4
}

export const checkWinner = (squares) => {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[parseInt(a / 3)][a % 3] &&
            squares[parseInt(a / 3)][a % 3] === squares[parseInt(b / 3)][b % 3] &&
            squares[parseInt(a / 3)][a % 3] === squares[parseInt(c / 3)][c % 3]) {
            return lines[i];
        }
    }
    return null;
}

const state = {
    view: VIEW.question1,
    players: [
        {
            symbol: null,
            isComputer: false,
            score: 0
        },
        {
            symbol: null,
            isComputer: false,
            score: 0
        }
    ],
    turn: false,
    countMove: 0,
    winner: null
}

const DataContext = React.createContext();  // context API

const Game = () => {
    const [data, setData] = useState(state);

    const nextStep = (userInput) => {
        if (userInput[0] === VIEW.question1) {
            if (userInput[1] === 'person') {
                setData({
                    ...data,
                    view: VIEW.question2
                });
            } else if (userInput[1] === 'me') {
                setData({
                    ...data,
                    view: VIEW.question2,
                    players: [
                        {
                            symbol: null,
                            isComputer: false,
                            score: 0
                        },
                        {
                            symbol: null,
                            isComputer: true,
                            score: 0
                        }
                    ]
                });

            }
        } else if (userInput[0] === VIEW.question2) {
            const tmpPlayers = data.players
            tmpPlayers[0].symbol = userInput[1] === SYMBOLS.x ? SYMBOLS.x : SYMBOLS.o;
            tmpPlayers[1].symbol = userInput[1] === SYMBOLS.x ? SYMBOLS.o : SYMBOLS.x;
            setData({
                ...data,
                view: VIEW.game,
                players: tmpPlayers,
                game: {
                    _gameBoard: [
                        ["", "", ""],
                        ["", "", ""],
                        ["", "", ""]
                    ],
                }
            });
        }
        console.log(data);


    }
    const addMove = (i, j, machineFirstMove = false) => {
        let gameBoard = data.game._gameBoard;
        let turnVar = data.turn ? false : true;
        let countmove = data.countMove;

        if (!machineFirstMove) {
            countmove++;
            gameBoard[i][j] = !data.turn ? data.players[0].symbol : data.players[1].symbol;
        }

        if (data.players[1].isComputer && countmove < 9) {
            let move
            countmove += 1;
            move = getBestMove(data.game._gameBoard, data.players[1].symbol)
            if (move) {
                gameBoard[move.move.row][move.move.column] = data.turn ? data.players[0].symbol : data.players[1].symbol;
            }
        }

        let isWinner = checkWinner(data.game._gameBoard)
        if (isWinner == null) {
            setData({
                ...data,
                game: { _gameBoard: gameBoard },
                turn: data.players[1].isComputer ? data.turn : !data.turn,
                countMove: countmove
            })
        } else {
            setData({
                ...data,
                winner: isWinner
            })
        }
    }
    const resetGame = () => {
        let countmove = data.countMove;
        if (data.players[1].isComputer && countmove % 2 == 0) {
            let gameBoard = [
                ["", "", ""],
                ["", "", ""],
                ["", "", ""]
            ]
            let move = getBestMove(gameBoard);
            gameBoard[move.move.row][move.move.column] = data.turn ? data.players[0].symbol : data.players[1].symbol;

            setData({
                ...data,
                game: {
                    _gameBoard: gameBoard
                },
                turn: false,
                winner: null,
                countMove: 1

            })

        } else {
            setData({
                ...data,
                game: {
                    _gameBoard: [
                        ["", "", ""],
                        ["", "", ""],
                        ["", "", ""]
                    ],
                },
                winner: null,
                countMove: 0

            })
        }


    }

    let comp;
    if (data.view === VIEW.question1) {
        comp = <Q1 />
    } else if (data.view == VIEW.question2) {
        comp = <Q2 />
    } else if (data.view === VIEW.game) {
        comp = <Q3 />
    }

    return (
        <DataContext.Provider value={{ data, nextStep, addMove, resetGame }}>
            {comp}
        </DataContext.Provider>
    )
}

export const useGlobalContext = () => useContext(DataContext)


const Q1 = () => {
    const { nextStep } = useContext(DataContext);
    return (
        <>
            <div className='StartGame'>
                <h1>Play Against - </h1>
            </div>
            <div className='Choose-Option'>
                <div className='button' onClick={() => nextStep([VIEW.question1, 'person'])}>Person</div>
                <div className='button' onClick={() => nextStep([VIEW.question1, 'me'])}>Me</div>
            </div>
        </>
    )
}

const Q2 = () => {
    const { data, nextStep } = useContext(DataContext);
    if (data.players[1].isComputer) {
        return (
            <>
                <div className='StartGame'>
                    <h1>Choose your symbol - </h1>
                </div>
                <div className='Choose-Option'>
                    <div className='button' onClick={() => nextStep([VIEW.question2, SYMBOLS.x])}>X</div>
                    <div className='button' onClick={() => nextStep([VIEW.question2, SYMBOLS.o])}>O</div>
                </div>
            </>
        )
    }
    return (
        <>
            <div className='StartGame'>
                <h1>Choose first person's symbol - </h1>
            </div>
            <div className='Choose-Option'>
                <div className='button' onClick={() => nextStep([VIEW.question2, 'X'])}>X</div>
                <div className='button' onClick={() => nextStep([VIEW.question2, 'O'])}>O</div>
            </div>
        </>
    )
}


const Q3 = () => {
    const { data } = useContext(DataContext);
    let firstText, secondText;
    if (data.players[1].isComputer) {
        firstText = 'Your symbol - ';
        secondText = 'My symbol - '
    } else {
        firstText = 'Player 1 symbol - ';
        secondText = 'Player 2 symbol - '
    }
    return (
        <>
            <div className='StartGame'>
                <h1>{firstText + data.players[0].symbol}</h1>
                <h1>{secondText + data.players[1].symbol}</h1>
                {/* <div className='simple-button' onClick={() => props.onClick('gameStart')}>Start Game</div> */}
                <Board />

            </div>

        </>
    )
}
export default Game;