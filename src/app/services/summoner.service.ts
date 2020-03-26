import { Game } from './../../models/match/game.model';
import { MatchList } from './../../models/match/matchlist.model';
import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Summoner } from 'src/models/summoner/summoner.model';
import { Champion } from 'src/models/champion/champion.model';
import { Ranked } from 'src/models/ranked/ranked.model';
import { Region } from 'src/models/region/region.model';
import { Mastery } from 'src/models/mastery/mastery.model';
import { BackEnd } from 'src/api/backend';

@Injectable({
  providedIn: 'root'
})
export class SummonerService {
  private backend: BackEnd = new BackEnd();

  constructor(private httpClient: HttpClient) {}

  setRegion(region: string) {
    this.backend.setRegion(region);
  }

  async getSummonerByName(name: string): Promise<Summoner> {
    const url = this.backend.getSummonerURL(name);

    let summoner: Summoner;
    await this.httpClient
      .get(url)
      .pipe(map((data: Summoner) => (summoner = data)))
      .toPromise();

    // summoner.mastery.forEach(element => {
    //   this.getChampionName(element.championId).then((data: Champion) => {
    //     element.champion = data;
    //   });
    // });

    return summoner;
  }

  async getMasteryBySummonerId(summonerId: string) {
    const url = this.backend.getMasteryURL(summonerId);

    let mastery: Mastery[];
    await this.httpClient
      .get(url)
      .pipe(map((data: Mastery[]) => (mastery = data)))
      .toPromise();

    const promises = mastery.map(async element => {
      await this.getChampionName(element.championId).then((data: Champion) => {
        element.champion = data;
      });
    });

    await Promise.all(promises);

    return mastery;
  }

  async getRankedDataBySummonerId(summonerId: string): Promise<Ranked[]> {
    const url = this.backend.getRankedURL(summonerId);

    let ranked: Ranked[];

    await this.httpClient
      .get(url)
      .pipe(map((data: Ranked[]) => (ranked = data)))
      .toPromise();

    return ranked;
  }

  async getMatchList(accountId: string, start: number, end: number) {
    const url = this.backend.getMatchHistoryURL(accountId, start, end);

    let matchList: MatchList;

    await this.httpClient
      .get(url)
      .pipe(map((data: MatchList) => (matchList = data)))
      .toPromise();

    return matchList;
  }

  async getGame(matchId: number, summonerId: string) {
    const url = this.backend.getMatchURL(matchId, summonerId);
    let game: Game;

    await this.httpClient
      .get(url)
      .pipe(map((data: Game) => (game = data)))
      .toPromise();

    await this.getChampionName(game.championId).then(
      data => (game.champion = data)
    );

    return game;
  }

  async getRegions(): Promise<Region[]> {
    const url = this.backend.getRegionURL();

    let region: Region[];

    await this.httpClient
      .get(url)
      .pipe(map((data: Region[]) => (region = data)))
      .toPromise();

    return region;
  }

  private async getChampionName(championId: number): Promise<Champion> {
    const url = this.backend.getChampionURL(championId);

    let championName;
    await this.httpClient
      .get(url)
      .pipe(map(data => (championName = data)))
      .toPromise();
    return championName;
  }
}
