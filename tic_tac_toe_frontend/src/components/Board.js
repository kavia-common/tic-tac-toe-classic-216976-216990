import React from "react";

/**
 * @param {{ value: ("X"|"O"|null), onClick: () => void, disabled: boolean, isWinning: boolean, index: number }} props
 */
function Cell({ value, onClick, disabled, isWinning, index }) {
  const markClass = value === "X" ? "mark markX" : value === "O" ? "mark markO" : "mark";

  return (
    <button
      type="button"
      className={`cell${isWinning ? " winning" : ""}`}
      onClick={onClick}
      disabled={disabled}
      aria-label={value ? `Cell ${index + 1}: ${value}` : `Cell ${index + 1}: empty`}
    >
      {value ? <span className={markClass}>{value}</span> : null}
    </button>
  );
}

// PUBLIC_INTERFACE
export default function Board({ squares, onPlay, disabled, winningLine }) {
  /** Renders the 3x3 Tic Tac Toe board and delegates clicks upward. */
  return (
    <div className="board" role="grid" aria-label="Tic Tac Toe board">
      {squares.map((value, idx) => {
        const isWinning = Array.isArray(winningLine) ? winningLine.includes(idx) : false;
        return (
          <Cell
            key={idx}
            value={value}
            index={idx}
            onClick={() => onPlay(idx)}
            disabled={disabled || value !== null}
            isWinning={isWinning}
          />
        );
      })}
    </div>
  );
}
