import { MiniSeries } from './miniseries.model';

export class Ranked {
  queueType: string;
  summonerName: string;
  hotStreak: boolean;
  miniSeries: MiniSeries;
  wins: number;
  veteran: boolean;
  losses: number;
  rank: string;
  leagueId: string;
  inactive: boolean;
  freshBlood: boolean;
  tier: string;
  summonerId: string;
  leaguePoints: number;
  winratio: number;
}
