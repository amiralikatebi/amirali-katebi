"use client";
import { useState } from "react";
import TicTacToe from "@/components/TicTacToe";
import TypingSpeed from "@/components/TypingSpeed";

export default function GamePage() {
  const [selectedGame, setSelectedGame] = useState(null);

  const games = [
    { title: "Tic Tac Toe", description: "Play against hard AI (Minimax).", component: <TicTacToe /> },
    { title: "Typing Speed", description: "Type sentences (EN/FA) with max 3 mistakes.", component: <TypingSpeed /> },
    // { title: "Dummy Game 1", description: "Coming soon...", component: <DummyGame name="Dummy Game 1" /> }
  ];

  if (selectedGame !== null) {
    const game = games[selectedGame];
    return (
      <div className="flex flex-col w-full lg:w-2/3 mx-auto mt-8">
        <button onClick={() => setSelectedGame(null)} className="mb-4 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 text-black">Back to Games</button>
        <h1 className="text-2xl font-bold mb-4">{game.title}</h1>
        <div className="p-4 border rounded-lg bg-white shadow-sm">
          {game.component}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full gap-4 lg:w-2/3 mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Choose a Game</h1>
      {games.map((g, i) => (
        <div key={i} className="p-4 border rounded-lg bg-white shadow-sm hover:bg-gray-50 cursor-pointer" onClick={() => setSelectedGame(i)}>
          <h2 className="font-semibold">{g.title}</h2>
          <p className="text-sm text-gray-500">{g.description}</p>
        </div>
      ))}
    </div>
  );
}
