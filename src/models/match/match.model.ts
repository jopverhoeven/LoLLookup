import { Champion } from './../champion/champion.model';
export class Match {
  lane: string;
  gameId: number;
  champion: number;
  platformId: string;
  season: number;
  queue: number;
  role: string;
  timestamp: number;
  date: Date;
  championType?: Champion;
}
