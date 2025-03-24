import { FirestoreCollections, Game } from "madness-shared";
import {} from "../../services/fb.service.js";
import { s_fb } from "../../services/index.js";

export async function getAllGames(p: {}) {
  try {
    const data = await s_fb.getAllDocsInCollection(FirestoreCollections.games);
    return data as Game[];
  } catch (e) {
    return [];
  }
}
