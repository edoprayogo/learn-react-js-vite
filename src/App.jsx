import { useState } from "react";
import Header from "./components/Header";

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function App({ xIsNext, squares, onPlay }) {
  function handleGame(i) {
    if (squares[i] || calculateWinner(squares)) return;

    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";

    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);

  let status = "";
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <h2>Tic Tac Toe</h2>
      <div className="board">
        {squares.map((value, i) => (
          <Square key={i} value={value} onSquareClick={() => handleGame(i)} />
        ))}
      </div>
      <div className="status">{status}</div>
    </>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const element of lines) {
    // const a = lines[i][0]
    // const b = lines[i][1]
    // const c = lines[i][2]
    const [a, b, c] = element;

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return false;
}

export default function OverallGame() {
  const [likes, setLikes] = useState(0);

  function handleClick() {
    setLikes(likes + 1);
  }


  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);

  }

  function resetGame() {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);

  }

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  const moves = history.map((squares, move) => {
    let desctription = "";
    if (move > 0) {
      desctription = "Go to move #" + move;
    } else {
      desctription = "Go to game start";
    }

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desctription}</button>
      </li>
    );
  });

  return (
    <>
      <div>
        <Header />
        <p>Likes: {likes}</p>
        <button onClick={handleClick}>Like</button>
      </div>
      <br></br>
      <br></br>

      <div className="game">
        <div className="game-baord">
          <App xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
        </div>
        <div className="game-info">
          <ol>{moves}</ol>
        </div>
      </div>
      <button className="reset-game" onClick={resetGame}>
        Reset
      </button>
    </>
  );
}
