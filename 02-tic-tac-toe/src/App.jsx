import { useState } from "react";
import confetti from "canvas-confetti"; //Lanza confeti
import { Square } from "./components/Square";
import { TURNS } from "./constants";
import { checkWinnerFrom, checkEndGame } from "./logic/board";
import { WinnerModal } from "./components/WinnerModal";
import "./App.css";
import { Board } from "./components/Board";
import { saveGameStorage, resetGameStorage } from "./logic/storage/index";

function App() {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem("board");
    return boardFromStorage //existe
      ? JSON.parse(boardFromStorage)
      : Array(9).fill(null);
  });
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem("turn");
    return turnFromStorage ? turnFromStorage : TURNS.X; //Si es null o undefined, uso TURNS.X
  });
  const [winner, setWinner] = useState(null); //null no hay ganador, false hay empate

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);
    //Resetear jueo
    resetGameStorage();
  };

  const updateBoard = (index) => {
    if (board[index] || winner) {
      return; //si ya tiene algo, retorna
    }

    const newBoard = [...board]; //Desestrcutura el board anterior como una copia
    newBoard[index] = turn; //Actualiza el indice del board con el valor X o O
    setBoard(newBoard); //Setea el nuevo Board
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);
    //guardar partida
    saveGameStorage({
      board: newBoard,
      turn: newTurn,
    });

    //revisar ganador
    const newWinner = checkWinnerFrom(newBoard);
    if (newWinner) {
      confetti();
      setWinner(newWinner); //actualiza el estado de manera asyncrono
      //No bloquea lo que sigue
      //alert(`El ganador es ${newWinner}`);
    } else if (checkEndGame(newBoard)) {
      setWinner(false); //empate
    }
  };

  return (
    <main className="board">
      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame}>Reset Game</button>
      <Board board={board} updateBoard={updateBoard} />
      <section className="turn">
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>

      <WinnerModal resetGame={resetGame} winner={winner} />
    </main>
  );
}

export default App;
