import "./style/styles.css";
import { useState,useEffect } from "react";
import { BoardProps, SquareProps } from "./interfaces";


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

function calculateWinner(squares: (string | null)[], ) {
  let lines: number[];
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

export default function Board({ squares, onClick, dimension }: BoardProps) {
  const [xIsNext, setXIsNext] = useState<boolean>(true);
  const [model,setModel] = useState(() => new Array(dimension*dimension).fill(null))
  const winner = calculateWinner(squares);
  let status;

  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  function handleClick(index: number): void {
    const newModel = [...model]
    newModel[index] = xIsNext ? "X" : "O";    
    setModel(newModel)
    setXIsNext(!xIsNext);

    /*if (newSquares[index] || calculateWinner(newSquares)) {
      return;
    }*/


    
    //onClick(index);
  }

  // Generate board squares
  /*const boardSquares = [];

  for (let row = 0; row < dimension; row++) {
    const boardRow = [];
    for (let col = 0; col < dimension; col++) {
      const index = row * dimension + col;
      boardRow.push(
        <Square key={index} value={squares[index]} onSquareClick={() => handleClick(index)} />
      );
    }
    boardSquares.push(
      <div key={row} className="board-row">
        {boardRow}
      </div>
    );
  }*/

  useEffect(() => {

    document.documentElement.style
    .setProperty('--my-dim',String(dimension));

  },[dimension])

  function renderBoard():JSX.Element[] {
    return model.map((element,index:number) => 
    <div key={index} className="board-row">
      <Square key={index} value={model[index]} onSquareClick={() => handleClick(index)} />
    </div>
    )
  }
  
  return (
    <div>
      <div className="status">{status}</div>
      <div className="container" >{renderBoard()}</div>
      <button className="restart-button" onClick={refreshPage}>Reset</button>
    </div>
  );
}
