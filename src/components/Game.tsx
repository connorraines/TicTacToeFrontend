import { useEffect, useState } from "react";
import Board, { calculateWinner } from "./Board";

export default function Game() {
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];
  const [newBoard, setBoard] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  // useEffect(() => {
  //     async function getMove(){
  //       try{
  //         setLoading(true)
  //         const response = await fetch("http://localhost:8000/move", {
  //           method: "POST",
  //           body: JSON.stringify(nextSquares),
  //           headers: {
  //             "Content-Type": "application/json",
  //           }
  //         })
  //         const responseData = await response.json()
  //         setLoading(false)
  //         setBoard(responseData)
  //       } catch(error) {
  //         setError(error.message)
  //         console.log(error)
  //       }
      
  //     }
  //     getMove()
  //  }, [])
  useEffect(() => {
    if (history.length === 1){
      return;
    }
    if (xIsNext){
      return;
    }
    console.log(history)
      async function getMove(){
        try{
          setLoading(true)
          var newList = [[0,0,0], [0,0,0], [0,0,0]]
          for (var i = 0; i < 9; i++){
            var newValue = currentSquares[i] ? currentSquares[i] : "" 
            if (i < 3) {
              newList[0][i] = newValue
            }
            else if (i < 6) {
              newList[1][i-3] = newValue
            }
            else {
              newList[2][i-6] = newValue
            }
          }
          const response = await fetch("https://yj3qyozqrg.execute-api.us-east-2.amazonaws.com/default/minimax", {
            method: "POST",
            body: JSON.stringify(newList),
            headers: {
              "Content-Type": "application/json",
            }
          })
          const responseData = await response.json()
          
          setLoading(false)
          //setBoard(responseData)
          handlePlay(responseData.flat())
        } catch(error) {
          setError(error.message)
          console.log(error)
        }
      
      }
      getMove()
      console.log(newBoard)
  }, [history])
  function handlePlay(nextSquares: string[]) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    setXIsNext(!xIsNext);
  }
  function jumpTo(nextMove: number) {
    setCurrentMove(nextMove);
    setXIsNext(nextMove % 2 === 0);
  }
  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Go to game start";
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)} className="border border-md rounded-md w-full px-4 py-1 text-left hover:bg-gray-100 cursor-pointer" disabled={!xIsNext}>{description}</button>
      </li>
    );
  });

  return (
    <div className="flex flex-row gap-10">
      <div>
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
        <header>{loading}</header>
      </div>
      <div>
        <ol className="space-y-2">{moves}</ol>
      </div>
    </div>
  );
}
