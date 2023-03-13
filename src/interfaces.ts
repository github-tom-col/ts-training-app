export interface SquareProps {
    value: string | null;
    onSquareClick: () => void;
}

export interface BoardProps {
    squares: Array<string | null>;
    onClick: (index: number) => void;
    dimension: number;
  }
