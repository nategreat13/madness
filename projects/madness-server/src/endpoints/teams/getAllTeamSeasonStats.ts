import { config } from "madness-shared";
import { TeamInfo, getTeamSeasonStats } from "cbbd";

export async function getAllTeamSeasonStats(p: {}) {
  try {
    return (
      (
        await getTeamSeasonStats({
          query: {
            season: 2025,
            seasonType: "regular",
          },
          auth: config.CBBD_API_KEY,
        })
      ).data ?? []
    );
  } catch (e) {
    return [];
  }
}
