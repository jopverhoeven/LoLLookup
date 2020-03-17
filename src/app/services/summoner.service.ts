import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Summoner } from 'src/models/summoner/summoner.model';
import {
  API_SUMMONER_URL,
  API_CHAMPION_NAME_URL
} from 'src/constants/api/api.constants';
import { Champion } from 'src/models/champion/champion.model';

@Injectable({
  providedIn: 'root'
})
export class SummonerService {
  constructor(private httpClient: HttpClient) {}

  async getSummonerByName(name: string): Promise<Summoner> {
    let summoner: Summoner;
    await this.httpClient
      .get(API_SUMMONER_URL + name)
      .pipe(map((data: Summoner) => (summoner = data)))
      .toPromise();

    summoner.mastery.forEach(element => {
      this.getChampionName(element.championId).then((data: Champion) => {
        element.champion = data;
      });
    });

    return summoner;
  }

  private async getChampionName(championId: number): Promise<Champion> {
    let championName;
    await this.httpClient
      .get(API_CHAMPION_NAME_URL + championId)
      .pipe(map(data => (championName = data)))
      .toPromise();
    return championName;
  }
}
