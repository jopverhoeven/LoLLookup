import { Champion } from '../champion/champion.model';

export class Mastery {
  chestGranted: boolean;
  championLevel: number;
  championPoints: number;
  championId: number;
  championPointsUntilNextLevel: number;
  lastPlayTime: number;
  tokensEarned: number;
  championPointsSinceLastLevel: number;
  summonerId: number;
  champion: Champion;
}
