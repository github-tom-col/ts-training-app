export interface SquareProps {
    value: string | null;
    onSquareClick: () => void;
}

export interface BoardProps {
    dimension: number;
    onPlay: () => void;
    onInit:(reset :() => void ) => void
  }
