import { config } from "madness-shared";
import { TeamInfo, getTeamSeasonStats } from "cbbd";

export async function getAllTeamSeasonStatsFromApi(p: {}) {
  try {
    return (
      (
        await getTeamSeasonStats({
          query: {
            season: 2025,
          },
          auth: config.CBBD_API_KEY,
        })
      ).data ?? []
    );
  } catch (e) {
    return [];
  }
}
