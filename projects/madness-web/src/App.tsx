import { TEST_CONSTANT, Game } from "madness-shared";
import React from "react";
import { s_api } from "./services";

export default function App() {
  return (
    <h1>
      {TEST_CONSTANT}
      <Blah />
    </h1>
  );
}

function Blah(p: {}) {
  const { data: games } = s_api.useSDK().games.getAllGames({});
  console.log(games, "L1Dh39AE5J");

  if (!games) {
    return null;
  }
  return (
    <div>
      {games.map((game) => {
        return <GameComp game={game} />;
      })}
    </div>
  );
}

function GameComp(p: { game: Game }) {
  return (
    <div>{`${p.game.homeTeam} (${p.game.homePoints}) vs. ${p.game.awayTeam} (${p.game.awayPoints}) `}</div>
  );
}
