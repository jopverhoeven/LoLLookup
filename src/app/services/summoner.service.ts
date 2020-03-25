import { Game } from './../../models/match/game.model';
import { MatchList } from './../../models/match/matchlist.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Summoner } from 'src/models/summoner/summoner.model';
import {
  API_SUMMONER_URL,
  API_CHAMPION_NAME_URL,
  API_RANKED_URL,
  API_MATCH_LIST_URL,
  API_MATCH_GAME_URL,
  API_REGION_URL
} from 'src/constants/api/api.constants';
import { Champion } from 'src/models/champion/champion.model';
import { Ranked } from 'src/models/ranked/ranked.model';
import { Region } from 'src/models/region/region.model';

@Injectable({
  providedIn: 'root'
})
export class SummonerService {
  private regionString = '&region=';

  constructor(private httpClient: HttpClient) {}

  setRegion(region: string) {
    this.regionString = '&region=' + region;
  }

  async getSummonerByName(name: string): Promise<Summoner> {
    let summoner: Summoner;
    await this.httpClient
      .get(API_SUMMONER_URL + name + this.regionString)
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
      .get(API_RANKED_URL + id + this.regionString)
      .pipe(map((data: Ranked[]) => (ranked = data)))
      .toPromise();

    return ranked;
  }

  async getMatchList(id: string, start: number, end: number) {
    let matchList: MatchList;

    await this.httpClient
      .get(API_MATCH_LIST_URL + id + '&start=' + start + '&end=' + end + this.regionString)
      .pipe(map((data: MatchList) => (matchList = data)))
      .toPromise();

    return matchList;
  }

  async getGame(gameId: number, summonerId: string) {
    let game: Game;

    await this.httpClient
      .get(API_MATCH_GAME_URL + gameId + '&summonerId=' + summonerId + this.regionString)
      .pipe(map((data: Game) => (game = data)))
      .toPromise();

    await this.getChampionName(game.championId).then(
      data => (game.champion = data)
    );

    return game;
  }

  async getRegions(): Promise<Region[]> {
    let region: Region[];

    await this.httpClient
      .get(API_REGION_URL)
      .pipe(map((data: Region[]) => (region = data)))
      .toPromise();

    return region;
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
