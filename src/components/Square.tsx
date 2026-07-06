interface SquareProps {
  value: string;
  onSquareClick: () => void;
  xIsNext: boolean;
}
export default function Square({value, onSquareClick, xIsNext}: SquareProps) {
  return <button className="w-24 h-24 border-2 rounded-md text-4xl flex justify-center items-center cursor-pointer" onClick={onSquareClick} disabled={!xIsNext}>{value}</button>;
}