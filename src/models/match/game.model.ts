import { Champion } from './../champion/champion.model';
export class Game {
  gameId: number;
  gameDuration: number;
  gameCreation: Date;

  queueType: string;
  championId: number;
  champion?: Champion;
}
