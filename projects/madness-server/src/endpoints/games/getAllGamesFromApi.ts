import { config } from "madness-shared";
import { getGames } from "cbbd";

export async function getAllGamesFromApi(p: {}) {
  try {
    const games =
      (
        await getGames({
          query: {
            season: 2025,
            tournament: "NCAA",
          },
          auth: config.CBBD_API_KEY,
        })
      ).data ?? [];

    return games;
  } catch (e) {
    return [];
  }
}
