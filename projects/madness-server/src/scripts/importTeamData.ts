import { getAllGamesFromApi } from "../endpoints/games/getAllGamesFromApi.js";
import { getAllTeamSeasonStatsFromApi } from "../endpoints/teams/getAllTeamSeasonStatsFromApi.js";
import { getAllTeamsFromAPI } from "../endpoints/teams/getAllTeamsFromApi.js";
import { FirestoreCollections } from "madness-shared";
import { s_fb } from "../services/index.js";

async function main() {
  const [games, teams, teamSeasonStats] = await Promise.all([
    getAllGamesFromApi({}),
    getAllTeamsFromAPI({}),
    getAllTeamSeasonStatsFromApi({}),
  ]);

  const uniqueTeamIdMap = games.reduce((acc, val) => {
    acc[val.homeTeamId] = true;
    acc[val.awayTeamId] = true;
    return acc;
  }, {} as Record<number, true>);

  const filteredTeams = teams.filter((t) => uniqueTeamIdMap[t.id]);
  const filteredTeamSeasonStats = teamSeasonStats.filter(
    (tss) => uniqueTeamIdMap[tss.teamId]
  );

  games.map(async (game) => {
    await s_fb.setDoc(FirestoreCollections.games, game.id, game);
  });

  filteredTeams.map(async (team) => {
    await s_fb.setDoc(FirestoreCollections.teams, team.id, team);
  });

  filteredTeamSeasonStats.map(async (stats) => {
    await s_fb.setDoc(
      FirestoreCollections.teamSeasonStats,
      stats.teamId,
      stats
    );
  });
}

main();
