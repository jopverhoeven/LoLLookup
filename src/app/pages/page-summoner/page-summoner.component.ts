import {
  DATA_CHAMPION_LOADING_URL,
  DATA_CHAMPION_ICON_URL
} from './../../../constants/api/api.constants';
import { MatchList } from './../../../models/match/matchlist.model';
import { Component, OnInit } from '@angular/core';
import { SummonerService } from 'src/app/services/summoner.service';
import { ActivatedRoute } from '@angular/router';
import { Summoner } from 'src/models/summoner/summoner.model';
import { DATA_SUMMONER_ICON_URL } from 'src/constants/api/api.constants';
import { Ranked } from 'src/models/ranked/ranked.model';
import { Game } from 'src/models/match/game.model';
import { Mastery } from 'src/models/mastery/mastery.model';

@Component({
  selector: 'app-page-summoner',
  templateUrl: './page-summoner.component.html',
  styleUrls: ['./page-summoner.component.scss']
})
export class PageSummonerComponent implements OnInit {
  profileIconUrl = DATA_SUMMONER_ICON_URL;
  championLoadingUrl = DATA_CHAMPION_LOADING_URL;
  championIconUrl = DATA_CHAMPION_ICON_URL;
  summonerSpellUrl = 'http://ddragon.leagueoflegends.com/cdn/10.6.1/img/spell/';
  itemIconUrl = 'http://ddragon.leagueoflegends.com/cdn/10.6.1/img/item/';
  summoner: Summoner;
  mastery: Mastery[];
  totalMasteryLevel: number;
  totalMasteryPoints: number;
  winRatio: number;
  matchList: MatchList;
  gameList: Game[] = [];
  rankedData: Ranked[];

  increase = 10;
  beginIndex = 0;
  endIndex = this.increase;

  doneLoading = false;
  doneLoadingSummoner = false;
  doneLoadingChampionMastery = false;
  doneLoadingNextMatches = true;
  error = false;

  constructor(
    private summonerService: SummonerService,
    private route: ActivatedRoute
  ) {}

  async ngOnInit() {
    const region = this.route.snapshot.paramMap.get('region');
    const summonerName = this.route.snapshot.paramMap.get('name');

    this.summonerService.setRegion(region);

    await this.getSummonerByName(summonerName);
    await this.getChampionMasteryBySummonerId(this.summoner.id);
    await this.getRankedDataBySummonerId(this.summoner.id);
    await this.loadNextMatches();

    this.calculateMasteryLevel();
    this.calculateMasteryPoints();
    this.calculateWinRatio();
    this.doneLoading = true;
  }

  async loadNextMatches() {
    this.doneLoadingNextMatches = false;
    await this.getMatchList(this.summoner.accountId);
    const promises = this.matchList.matches.map(async element => {
      await this.getGameFromMatchId(element.gameId, this.summoner.id);
    });
    await Promise.all(promises);
    this.gameList = this.gameList.sort((a, b) => {
      return (
        new Date(b.gameCreation).getTime() - new Date(a.gameCreation).getTime()
      );
    });
    this.doneLoadingNextMatches = true;
  }

  async getMatchList(id: string) {
    await this.summonerService
      .getMatchList(id, this.beginIndex, this.endIndex)
      .then(data => (this.matchList = data))
      .catch(error => {
        this.error = true;
      });
    this.beginIndex += this.increase;
    this.endIndex += this.increase;
  }

  async getGameFromMatchId(matchId: number, summonerId: string) {
    await this.summonerService
      .getGame(matchId, summonerId)
      .then(data => {
        data.gameCreation = new Date(data.gameCreation);
        this.gameList.push(data);
      })
      .catch(error => {
        this.error = true;
      });
  }

  async getSummonerByName(summonerName: string) {
    await this.summonerService
      .getSummonerByName(summonerName)
      .then(data => {
        this.summoner = data;
        this.doneLoadingSummoner = true;
      })
      .catch(error => {
        this.error = true;
      });
  }

  async getChampionMasteryBySummonerId(summonerId: string) {
    await this.summonerService
      .getMasteryBySummonerId(summonerId)
      .then(data => {
        this.mastery = data;
        this.doneLoadingChampionMastery = true;
      })
      .catch(() => (this.error = true));
  }

  async getRankedDataBySummonerId(summonerId: string) {
    await this.summonerService
      .getRankedDataBySummonerId(summonerId)
      .then(data => {
        this.rankedData = data;
      })
      .catch(error => {
        this.error = true;
      });
  }

  calculateKDA(kills: number, deaths: number, assists: number) {
    const kda = (kills + assists) / deaths;
    const rounded = Math.round((kda + Number.EPSILON) * 100) / 100;
    return rounded;
  }

  calculateMasteryLevel() {
    let total = 0;
    this.mastery.forEach(element => {
      total += element.championLevel;
    });

    this.totalMasteryLevel = total;
  }

  calculateMasteryPoints() {
    let total = 0;
    this.mastery.forEach(element => {
      total += element.championPoints;
    });

    this.totalMasteryPoints = total;
  }

  calculateWinRatio() {
    this.rankedData.forEach(element => {
      element.winratio = Math.round(
        (element.wins / (element.wins + element.losses)) * 100
      );
    });
  }
}
