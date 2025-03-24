import { GameInfo, TeamInfo, TeamSeasonStats as TSS } from "cbbd";

export type Game = GameInfo;
export type Team = TeamInfo;
export type TeamSeasonStats = TSS;

export enum FirestoreCollections {
  games = "games",
  teams = "teams",
  teamSeasonStats = "teamSeasonStats",
}
