import { FirestoreCollections } from "madness-shared";
import {} from "../../services/fb.service.js";
import { s_fb } from "../../services/index.js";

export async function getGame(p: { id: string }) {
  try {
    const data = await s_fb.getDoc(FirestoreCollections.games, p.id);
    return data;
  } catch (e) {
    throw new Error(`Error getting game: ${p.id}`);
  }
}
