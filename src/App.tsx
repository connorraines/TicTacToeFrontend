import Game from './components/Game'



function App() {
  return (
    <>
      <div className = "min-h-screen w-full flex items-center justify-center flex-col bg-stone-300">
        <h1 className="text-4xl font-mono">Tic Tac Toe</h1>
        <p className="text-2 text-gray-600 font-mono mb-8">Extremely High Stakes</p>
        <Game/>
      </div>
    </>
  )
}

export default App
