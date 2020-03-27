import { Champion } from './../champion/champion.model';
import { SummonerSpell } from '../champion/summonerspell.model';
export class Game {
  gameId: number;
  gameDuration: number;
  gameCreation: Date;

  queueType: string;
  championId: number;
  champion?: Champion;

  kills: number;
  deaths: number;
  assists: number;

  spell1: number;
  spell2: number;
  summonerSpell1?: SummonerSpell;
  summonerSpell2?: SummonerSpell;

  won: boolean;

  teams: GameTeam[];
}

export class GameTeam {
  kills: number;
  deaths: number;
  assists: number;

  firstBlood: boolean;
  firstTower: boolean;
  firstInhibitor: boolean;
  firstBaron: boolean;
  firstDragon: boolean;
  firstRiftHerald: boolean;
  towerKills: number;
  inhibitorKills: number;
  baronKills: number;
  dragonKills: number;
  riftHeraldKills: number;
  bans: GameTeamBans[];
  players: GameTeamPlayers[];
}

export class GameTeamBans {
  championId: number;
  pickTurn: number;
}

export class GameTeamPlayers {
  participantId: number;
  summonerName: string;
  championId: number;

  summonerSpell1: number;
  summonerSpell2: number;

  items: number[];

  kills: number;
  deaths: number;
  assists: number;
}
