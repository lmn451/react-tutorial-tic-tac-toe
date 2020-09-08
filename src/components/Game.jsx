import React, { useState } from "react";
import Board from "./Board";
import "../index.css";
import { calculateWinner, getLocation } from "./helper";

const Game = () => {
  const [history, setHistory] = useState([
    {
      squares: Array(9).fill(null),
    },
  ]);
  const [currentStepNumber, setCurrentStepNumber] = useState(0);
  const [xIsNext, setxIsNext] = useState(true);

  const handleClick = i => {
    setHistory(() => history.slice(0, currentStepNumber + 1));
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares).winner || squares[i]) {
      return;
    }
    squares[i] = xIsNext ? "X" : "O";
    setHistory(() =>
      history.concat([
        {
          squares,
          currentLocation: getLocation(i),
          stepNumber: history.length,
        },
      ])
    );
    setxIsNext(() => !xIsNext);
    setCurrentStepNumber(history.length);
  };

  const jumpTo = step => {
    setCurrentStepNumber(step);
    setxIsNext(step % 2 === 0);
  };

  const sortMoves = () => {
    setHistory(() => history.reverse());
  };

  const reset = () => {
    setHistory([{ squares: Array(9).fill(null) }]);
    setCurrentStepNumber(0);
    setxIsNext(true);
  };

  const current = history[currentStepNumber];
  const { winner, winnerRow } = calculateWinner(current.squares);

  const moves = history.map((step, move) => {
    const currentLocation = step.currentLocation
      ? `(${step.currentLocation})`
      : "";
    const desc = step.stepNumber
      ? `Go to move #${step.stepNumber}`
      : "Go to game start";
    const classButton = move === currentStepNumber ? "button--green" : "";

    return (
      <li key={move}>
        <button
          className={`${classButton} button`}
          onClick={() => jumpTo(move)}
        >
          {`${desc} ${currentLocation}`}
        </button>
      </li>
    );
  });

  let status;
  if (winner) {
    status = `Winner ${winner}`;
  } else if (history.length === 10) {
    status = "Draw. No one won.";
  } else {
    status = `Next player: ${xIsNext ? "X" : "O"}`;
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={current.squares}
          winnerSquares={winnerRow}
          onClick={i => handleClick(i)}
        />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <button className="button" onClick={() => sortMoves()}>
          Sort moves
        </button>
        <button className="button button--new-game" onClick={() => reset()}>
          New game
        </button>
        <ol>{moves}</ol>
      </div>
    </div>
  );
};

export default Game;
