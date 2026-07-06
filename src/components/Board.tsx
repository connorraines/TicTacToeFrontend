import Square from "./Square";

interface BoardProps {
    xIsNext: boolean;
    squares: string[];
    onPlay: (squares: string[]) => void;
}
export default function Board({ xIsNext, squares, onPlay }: BoardProps) {
  function onSquareClick(i: number) {
    if (squares[i] || calculateWinner(squares)) {
    return;
    }
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";
    onPlay(nextSquares);
   
  }
    let draw = true;
    for (let i = 0; i < 9; i++){
      console.log("out of if");
      if (squares[i] == '' || squares[i] == null){
        console.log("inside if");
        draw = false;
      }
    }
    const winner = calculateWinner(squares);
    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else if (draw) {
      status = "The game was a draw!"
    } else if (xIsNext){
      status = "Next player: " + (xIsNext ? "X" : "O");
    } else {
      status = "AI is choosing a move..."
    }
  return (
    <>
      <div className="text-xl">{status}</div>
      <div className="grid grid-cols-3 gap-2">
        {squares.map((value, i) => (
            <Square
            key={i}
            value={value}
            onSquareClick={() => onSquareClick(i)}
            xIsNext={xIsNext}
            />
        ))}
      </div>
    
    </>
  );
}
export function calculateWinner(squares: string[]) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
