export interface SquareProps {
    value: string | null;
    onSquareClick: () => void;
}

export interface BoardProps {
    dimension: number;
    onPlay: () => void;
    onEnd: () => void;
  }
