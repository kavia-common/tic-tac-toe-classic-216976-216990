import { useCallback, useMemo, useState } from "react";

const EMPTY_BOARD = Array(9).fill(null);
const WINNING_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

/**
 * Returns the winner symbol and the winning line (if any).
 * @param {Array<("X"|"O"|null)>} board
 * @returns {{winner: ("X"|"O"|null), line: number[] | null}}
 */
function getWinner(board) {
  for (const line of WINNING_LINES) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], line };
    }
  }
  return { winner: null, line: null };
}

/**
 * True when all squares are filled and no winner exists.
 * @param {Array<("X"|"O"|null)>} board
 * @returns {boolean}
 */
function isDraw(board) {
  return board.every((s) => s !== null);
}

// PUBLIC_INTERFACE
export function useTicTacToe() {
  /** Hook that manages Tic Tac Toe board state and game progression. */
  const [board, setBoard] = useState(EMPTY_BOARD);
  const [xIsNext, setXIsNext] = useState(true);

  const { winner, line } = useMemo(() => getWinner(board), [board]);
  const draw = useMemo(() => !winner && isDraw(board), [winner, board]);
  const gameOver = Boolean(winner) || draw;

  const currentPlayer = xIsNext ? "X" : "O";

  const makeMove = useCallback(
    (index) => {
      if (gameOver) return;
      setBoard((prev) => {
        if (prev[index] !== null) return prev;
        const next = prev.slice();
        next[index] = currentPlayer;
        return next;
      });
      setXIsNext((prev) => !prev);
    },
    [gameOver, currentPlayer]
  );

  const reset = useCallback(() => {
    setBoard(EMPTY_BOARD);
    setXIsNext(true);
  }, []);

  return {
    board,
    currentPlayer,
    winner,
    draw,
    gameOver,
    winningLine: line,
    makeMove,
    reset,
  };
}
