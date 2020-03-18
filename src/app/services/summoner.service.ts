import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Summoner } from 'src/models/summoner/summoner.model';
import {
  API_SUMMONER_URL,
  API_CHAMPION_NAME_URL,
  API_RANKED_URL
} from 'src/constants/api/api.constants';
import { Champion } from 'src/models/champion/champion.model';
import { Ranked } from 'src/models/ranked/ranked.model';

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

    const promises = summoner.mastery.map(async element => {
      await this.getChampionName(element.championId).then((data: Champion) => {
        element.champion = data;
      });
    });

    await Promise.all(promises);

    // summoner.mastery.forEach(element => {
    //   this.getChampionName(element.championId).then((data: Champion) => {
    //     element.champion = data;
    //   });
    // });

    return summoner;
  }

  async getRankedDataBySummonerId(id: string): Promise<Ranked[]> {
    let ranked: Ranked[];

    await this.httpClient
    .get(API_RANKED_URL + id)
    .pipe(map((data: Ranked[]) => (ranked = data)))
    .toPromise();

    return ranked;
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
