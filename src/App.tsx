import "./style/styles.css";
import { useState, useEffect, useMemo } from "react";
import { BoardProps, SquareProps } from "./interfaces";
import { calculateWinner } from "./functions/calculateWinner";

export default function Board({ dimension, onPlay, onInit }: BoardProps) {
  const [xIsNext, setXIsNext] = useState<boolean>(true);
  const [model, setModel] = useState(() => new Array(dimension ** 2).fill(null));
  const winner = useMemo(() => calculateWinner(model, dimension), [model, dimension]);

  function handleClick(index: number): void {
    if (model[index] == null) {
      const newModel = [...model];
      newModel[index] = xIsNext ? "X" : "O";
      setModel(newModel);
      setXIsNext(!xIsNext);
      onPlay();
    }
  }

  useEffect(() => {
    document.documentElement.style.setProperty("--my-dim", String(dimension));
    setModel(new Array(dimension ** 2).fill(null))
    onInit(() => {
      document.documentElement.style.setProperty("--my-dim", String(dimension));
      setModel(new Array(dimension ** 2).fill(null))
    })
  }, [dimension]);

  const renderBoard = useMemo(() => {
    return model.map((_, index) => (
      <div key={index} className="board-row">
        <Square value={model[index]} onSquareClick={() => handleClick(index)} />
      </div>
    ));
  }, [model]);

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
      <div className="container">{renderBoard}</div>
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
