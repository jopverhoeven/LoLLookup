import { Mastery } from '../mastery/mastery.model';

export class Summoner {
  name: string;
  id: string;
  summonerLevel: number;
  profileIconId: number;
  mastery: Mastery[];
}
