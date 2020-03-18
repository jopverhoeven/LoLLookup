import { Component, OnInit } from '@angular/core';
import { SummonerService } from 'src/app/services/summoner.service';
import { ActivatedRoute } from '@angular/router';
import { Summoner } from 'src/models/summoner/summoner.model';
import {
  DATA_SUMMONER_ICON_URL,
  DATA_CHAMPION_LOADING_URL
} from 'src/constants/api/api.constants';
import { Ranked } from 'src/models/ranked/ranked.model';

@Component({
  selector: 'app-page-summoner',
  templateUrl: './page-summoner.component.html',
  styleUrls: ['./page-summoner.component.scss']
})
export class PageSummonerComponent implements OnInit {
  profileIconUrl = DATA_SUMMONER_ICON_URL;
  championIconUrl = DATA_CHAMPION_LOADING_URL;
  doneLoading = false;
  summoner: Summoner;
  totalMasteryLevel: number;
  totalMasteryPoints: number;
  winRatio: number;
  rankedData: Ranked[];

  constructor(
    private summonerService: SummonerService,
    private route: ActivatedRoute
  ) {}

  async ngOnInit() {
    const summonerName = this.route.snapshot.paramMap.get('name');
    await this.getSummonerByName(summonerName);
    await this.getRankedDataBySummonerId(this.summoner.id);
    this.calculateMasteryLevel();
    this.calculateMasteryPoints();
    this.calculateWinRatio();
    this.doneLoading = true;
  }

  async getSummonerByName(summonerName: string) {
    await this.summonerService
      .getSummonerByName(summonerName)
      .then(data => (this.summoner = data));
  }

  async getRankedDataBySummonerId(summonerId: string) {
    await this.summonerService
      .getRankedDataBySummonerId(summonerId)
      .then(data => {
        this.rankedData = data;
      });
  }

  calculateMasteryLevel() {
    let total = 0;
    this.summoner.mastery.forEach(element => {
      total += element.championLevel;
    });

    this.totalMasteryLevel = total;
  }

  calculateMasteryPoints() {
    let total = 0;
    this.summoner.mastery.forEach(element => {
      total += element.championPoints;
    });

    this.totalMasteryPoints = total;
  }

  calculateWinRatio() {
    this.rankedData.forEach(element => {
      element.winratio = Math.round((element.wins / (element.wins + element.losses)) * 100);
    });

  }
}
