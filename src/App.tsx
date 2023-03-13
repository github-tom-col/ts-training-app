import "./style/styles.css";
import { useState } from "react";

interface SquareProps {
  value?: string | null;
  onSquareClick?: () => void;
}

function Square({ value, onSquareClick }: SquareProps) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function refreshPage() {
  window.location.reload();
}

function calculateWinner(squares: (string | null)[]) {
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
    if (
      squares[a] && squares[a] === squares[b] && squares[a] === squares[c]
    ) {
      return squares[a];
    }
  }
  return null;
}

interface BoardProps {
  squares: Array<string | null>;
  onClick: (index: number) => void;
  dimension: number;
}

export default function Board({ squares, onClick, dimension }: BoardProps) {
  const [xIsNext, setXIsNext] = useState<boolean>(true);
  const winner = calculateWinner(squares);
  let status;

  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  function handleClick(index: number): void {
    const newSquares = [...squares];

    if (newSquares[index] || calculateWinner(newSquares)) {
      return;
    }

    newSquares[index] = xIsNext ? "X" : "O";

    setXIsNext(!xIsNext);
    onClick(index);
  }

  // Generate board squares
  const boardSquares = [];

  for (let row = 0; row < dimension; row++) {
    const boardRow = [];
    for (let col = 0; col < dimension; col++) {
      const index = row * dimension + col;
      boardRow.push(
        <Square
          key={index}
          value={squares[index]}
          onSquareClick={() => handleClick(index)}
        />
      );
    }
    boardSquares.push(
      <div key={row} className="board-row">
        {boardRow}
      </div>
    );
  }
  
  return (
    <div>
      <div className="status">{status}</div>
      <div className="container">{boardSquares}</div>
      <button className="restart-button" onClick={refreshPage}>Reset</button>
    </div>
  );
}
