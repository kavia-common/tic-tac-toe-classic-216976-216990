import React, { useEffect } from "react";
import "./App.css";
import Board from "./components/Board";
import { useTicTacToe } from "./hooks/useTicTacToe";

/**
 * Returns the UI text for game state.
 * @param {{winner: ("X"|"O"|null), draw: boolean, currentPlayer: ("X"|"O")}} state
 * @returns {{turnText: string, resultText: string, resultStrong: string | null}}
 */
function getStatusText({ winner, draw, currentPlayer }) {
  if (winner) {
    return {
      turnText: "Game over",
      resultText: "Winner:",
      resultStrong: winner,
    };
  }
  if (draw) {
    return {
      turnText: "Game over",
      resultText: "Result:",
      resultStrong: "Draw",
    };
  }
  return {
    turnText: "Turn",
    resultText: "Next player:",
    resultStrong: currentPlayer,
  };
}

// PUBLIC_INTERFACE
function App() {
  /** Main application entry rendering the Tic Tac Toe screen. */
  const { board, currentPlayer, winner, draw, gameOver, winningLine, makeMove, reset } =
    useTicTacToe();

  // Avoid direct DOM manipulation per rules; only adjust document title as a side-effect.
  useEffect(() => {
    document.title = "Tic Tac Toe";
  }, []);

  const { turnText, resultText, resultStrong } = getStatusText({ winner, draw, currentPlayer });
  const dotIsX = !winner && !draw ? currentPlayer === "X" : winner === "X";

  return (
    <div className="App">
      <main className="shell">
        <section className="card" aria-label="Tic Tac Toe game">
          <header className="header">
            <div className="titleRow">
              <h1 className="title">Tic Tac Toe</h1>
              <div className="badge" aria-label="Local 2-player game">
                LOCAL • 2P
              </div>
            </div>
            <p className="subTitle">
              Two players on one device. Tap a square to place your mark.
            </p>
          </header>

          <div className="statusRow" aria-live="polite" aria-atomic="true">
            <div className="turnIndicator">
              <span className={`turnDot${dotIsX ? " isX" : ""}`} aria-hidden="true" />
              <span className="turnLabel">{turnText}</span>
              <span className="turnValue">{gameOver ? "—" : currentPlayer}</span>
            </div>

            <div className="result">
              <span>{resultText} </span>
              {resultStrong ? <span className="resultStrong">{resultStrong}</span> : null}
            </div>
          </div>

          <div className="boardWrap">
            <Board
              squares={board}
              onPlay={makeMove}
              disabled={gameOver}
              winningLine={winningLine}
            />
          </div>

          <footer className="footer">
            <button type="button" className="btn" onClick={reset}>
              Reset game
            </button>
            <button
              type="button"
              className="btn btnSecondary"
              onClick={reset}
              aria-label="Start a new round"
              title="Start a new round"
            >
              New round
            </button>
          </footer>

          <p className="hint">
            Tip: Want to play again? Hit <kbd>Reset</kbd> anytime.
          </p>
        </section>
      </main>
    </div>
  );
}

export default App;
