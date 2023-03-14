import "./style/styles.css";
import { useState, useEffect } from "react";
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

function calculateWinner(squares: string[], dimension: number): string | null {
  const winningLines = [];
  for (let i = 0; i < dimension; i++) {
    // add rows
    winningLines.push(Array.from({ length: dimension }, (_, l) => i * dimension + l));

    // add columns
    winningLines.push(Array.from({ length: dimension }, (_, j) => i + j * dimension));
  }

    // add diagonals
    winningLines.push(Array.from({ length: dimension }, (_, i) => i * (dimension + 1)));
    winningLines.push(Array.from({ length: dimension }, (_, i) => (i + 1) * (dimension - 1)));

  for (let i = 0; i < winningLines.length; i++) {
    const line = winningLines[i];
    const [a, ...rest] = line;
    if (!squares[a]) {
      continue;
    }
    const allEqual = rest.every((i) => squares[i] === squares[a]);
    if (allEqual) {
      return squares[a];
    }
  }

  return null;
}

function DimSelector({ onChange }: { onChange: (dimension: number) => void }) {
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const dimension = parseInt(event.target.value);
    onChange(dimension);
  }

  return (
    <div className="Selector">
      <input type="number" id="boardSize" min="2" placeholder="here" onChange={handleChange} />
    </div>
  );
}

export function TicTacToeApp(){
    const [dimension, setDimension] = useState(3);
    const [playCount, setPlayCount] = useState(0);
    
    function handlePlay(){
      setPlayCount((previousPlayCount) => previousPlayCount + 1)
    }

    function initBoard() {
      return Array(dimension**2).fill(null)
    }

    function handleDimensionChanged(e: React.ChangeEvent<HTMLInputElement>) {
      const newDimension = parseInt(e.target.value);
        const newSquares = Array(newDimension ** 2).fill(null);
        setDimension(newDimension);
      }
    
  
    function handleClick(index: number) {

      console.log("clicked on" + index + "square")
    }
  
    return (
      <div>
          <div className="dimension-selector">
            Enter dimension value : 
            <input type="number" value={dimension} onChange={handleDimensionChanged} />
          <p className="play-count">play count : {playCount}</p>
          </div>
          <div>
            <Board dimension={dimension} onPlay={handlePlay}/>
          </div>
        </div>
    );
  }

export function Board({ dimension, onPlay}: BoardProps = {onPlay: () => {}, dimension: 0}) {
  const [xIsNext, setXIsNext] = useState<boolean>(true);
  const [model, setModel] = useState(() => new Array());
  const winner = calculateWinner(model, dimension);
  
  function handleClick(index: number): void {

    const newModel = [...model];
    newModel[index] = xIsNext ? "X" : "O";
    setModel(newModel);
    setXIsNext(!xIsNext);
    onPlay();
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

