import { useState } from "react";
import Board from "../App";


export function TicTacToeApp(){
    const [dimension, setDimension] = useState(3);
    const [playCount, setPlayCount] = useState(0);
    const [endgame, setEndgame] = useState();
    
    function handlePlay(){
      setPlayCount((previousPlayCount) => previousPlayCount + 1)
    }

    function handleEndgame(){
      
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
            <Board dimension={dimension} onPlay={handlePlay} onEnd ={handleEndgame}/>
          </div>
        </div>
    );
  }