import { useState } from "react";
import Board from "../App";

export function TicTacToeApp() {
  const [dimension, setDimension] = useState(3);
  const [playCount, setPlayCount] = useState(0);
  const [reset, setReset] = useState(() => () => {})

  function handlePlay() {
    setPlayCount((previousPlayCount) => previousPlayCount + 1);
  }

  function handleRestart() {
    setDimension(3);
    setPlayCount(0);
    reset();
  }

  function handleInit(resetFn: () => void){
    setReset(() => resetFn)
  }

  function handleDimensionChanged(e: React.ChangeEvent<HTMLInputElement>) {
    const newDimension = parseInt(e.target.value);
    setDimension(newDimension);
  }


  return (
    <div>
      <div className="dimension-selector">
        Enter dimension value :
        <input type="number" value={dimension} onChange={handleDimensionChanged} />
        <p className="play-count">play count : {playCount}</p>
      </div>
      <div>
        <Board dimension={dimension} onPlay={handlePlay} onInit={handleInit} />
      </div>
      <button onClick={handleRestart}>
        Reset
      </button> 
    </div>
  );
}
