"use client";
import { useState, useEffect } from "react";

export default function TicTacToe() {
  const emptyBoard = Array(9).fill(null);
  const [board, setBoard] = useState(emptyBoard);
  const [winner, setWinner] = useState(null);
  const [score, setScore] = useState({ player: 0, ai: 0 });
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);

  const checkWinner = (b) => {
    const lines = [
      [0,1,2],[3,4,5],[6,7,8],
      [0,3,6],[1,4,7],[2,5,8],
      [0,4,8],[2,4,6]
    ];
    for (let [a,bIndex,c] of lines) {
      if (b[a] && b[a] === b[bIndex] && b[a] === b[c]) return b[a];
    }
    if (!b.includes(null)) return "Draw";
    return null;
  };

  const minimax = (b, isMaximizing) => {
    const result = checkWinner(b);
    if (result === "O") return 1;
    if (result === "X") return -1;
    if (result === "Draw") return 0;

    if (isMaximizing) {
      let bestScore = -Infinity;
      b.forEach((cell, i) => {
        if (!cell) {
          b[i] = "O";
          bestScore = Math.max(bestScore, minimax(b, false));
          b[i] = null;
        }
      });
      return bestScore;
    } else {
      let bestScore = Infinity;
      b.forEach((cell, i) => {
        if (!cell) {
          b[i] = "X";
          bestScore = Math.min(bestScore, minimax(b, true));
          b[i] = null;
        }
      });
      return bestScore;
    }
  };

  const aiMove = () => {
    let bestScore = -Infinity;
    let move;
    board.forEach((cell, i) => {
      if (!cell) {
        board[i] = "O";
        const score = minimax(board, false);
        board[i] = null;
        if (score > bestScore) {
          bestScore = score;
          move = i;
        }
      }
    });
    if (move !== undefined) {
      const newBoard = [...board];
      newBoard[move] = "O";
      setBoard(newBoard);
      const result = checkWinner(newBoard);
      if (result) handleWinner(result);
      else setIsPlayerTurn(true);
    }
  };

  const handleWinner = (result) => {
    setWinner(result);
    if (result === "X") setScore(prev => ({ ...prev, player: prev.player + 1 }));
    else if (result === "O") setScore(prev => ({ ...prev, ai: prev.ai + 1 }));
  };

  const handleClick = (index) => {
    if (!isPlayerTurn || board[index] || winner) return;
    const newBoard = [...board];
    newBoard[index] = "X";
    setBoard(newBoard);
    const result = checkWinner(newBoard);
    if (result) handleWinner(result);
    else setIsPlayerTurn(false);
  };

  useEffect(() => {
    if (!isPlayerTurn && !winner) {
      const timer = setTimeout(aiMove, 300);
      return () => clearTimeout(timer);
    }
  }, [isPlayerTurn, winner]);

  const resetBoard = () => {
    setBoard(emptyBoard);
    setWinner(null);
    setIsPlayerTurn(true);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-lg font-semibold">
        Player: {score.player} | AI: {score.ai}
      </div>
      <div className="grid grid-cols-3 gap-2">
        {board.map((cell, i) => (
          <div
            key={i}
            className="w-16 h-16 flex items-center justify-center border text-2xl font-bold cursor-pointer bg-white hover:bg-gray-50"
            onClick={() => handleClick(i)}
          >
            {cell}
          </div>
        ))}
      </div>
      {winner && <div className="mt-2 text-lg font-semibold">{winner === "Draw" ? "Draw!" : winner + " Wins!"}</div>}
      <button onClick={resetBoard} className="px-4 py-2 bg-blue-500 text-white rounded-lg">
        Reset
      </button>
    </div>
  );
}
