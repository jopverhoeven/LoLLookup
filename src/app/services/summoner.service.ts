import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Summoner } from 'src/models/summoner/summoner.model';
import { API_SUMMONER_URL } from 'src/constants/api/api.constants';

@Injectable({
  providedIn: 'root'
})
export class SummonerService {

  constructor(
    private httpClient: HttpClient
  ) { }

  async getSummonerByName(name: string): Promise<Summoner> {
    let summoner: Summoner;
    await this.httpClient.get(API_SUMMONER_URL + name)
    .pipe(
      map((data: Summoner) => summoner = data)
    ).toPromise();
    return summoner;
  }
}
