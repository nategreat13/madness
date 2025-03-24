import { config } from "madness-shared";
import { getTeams } from "cbbd";

export async function getAllTeams(p: {}) {
  try {
    const teams =
      (
        await getTeams({
          query: {
            season: 2025,
          },
          auth: config.CBBD_API_KEY,
        })
      ).data ?? [];

    return teams;
  } catch (e) {
    return [];
  }
}
