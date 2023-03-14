import "./style/styles.css";
import { useState, useEffect } from "react";
import { BoardProps, SquareProps } from "./interfaces";
import { TicTacToeApp } from "./functions/TicTacToeApp";
import { calculateWinner } from "./functions/calculateWinner";

export default function Board({ dimension, onPlay, onEnd}: BoardProps = {onPlay: () => {}, onEnd: () => {}, dimension: 0}) {
  const [xIsNext, setXIsNext] = useState<boolean>(true);
  const [model, setModel] = useState(() => new Array());
  const winner = calculateWinner(model, dimension);
  
  function handleClick(index: number): void {

    const newModel = [...model];
    newModel[index] = xIsNext ? "X" : "O";
    setModel(newModel);
    setXIsNext(!xIsNext);
    onPlay();
    onEnd();
  }

  useEffect(() => {
    setModel(new Array(dimension * dimension).fill(null));
  }, [dimension]);

  useEffect(() => {
    document.documentElement.style.setProperty("--my-dim", String(dimension));
  }, [dimension]);

  function renderBoard(): JSX.Element[] {
    return model.map((element, index: number) => (
      <div key={index} className="board-row">
        <Square key={index} value={model[index]} onSquareClick={() => handleClick(index)} />
      </div>
    ));
  }

  let status;

  if (winner) {
    status = `Winner: ${winner}`;
  } else if (model.indexOf(null) === -1) {
    status = "Draw";
  } else {
    status = `Next player: ${xIsNext ? "X" : "O"}`;
  }

  return (
    <div>
      <div className="status">{status}</div>
      <div className="container">{renderBoard()}</div>
      <button className="restart-button" onClick={refreshPage}>
        Reset
      </button>
    </div>
  );
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
