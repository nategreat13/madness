import { getAllGames } from "../endpoints/games/getAllGames.js";
import { getAllTeamSeasonStats } from "../endpoints/teams/getAllTeamSeasonStats.js";
import { getAllTeams } from "../endpoints/teams/getAllTeams.js";

async function main() {
  const [games, teams, teamSeasonStats] = await Promise.all([
    getAllGames({}),
    getAllTeams({}),
    getAllTeamSeasonStats({}),
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

  console.log(games.length, "bYYUIuIFKG");
  console.log(filteredTeams.length, "bYYUIuIFKG");
  console.log(filteredTeamSeasonStats.length, "bYYUIuIFKG");
}

main();
