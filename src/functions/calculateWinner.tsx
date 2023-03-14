export function calculateWinner(squares: string[], dimension: number): string | null {
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