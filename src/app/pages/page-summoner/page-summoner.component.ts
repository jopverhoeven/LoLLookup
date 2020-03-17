import { Component, OnInit } from '@angular/core';
import { SummonerService } from 'src/app/services/summoner.service';
import { ActivatedRoute } from '@angular/router';
import { Summoner } from 'src/models/summoner/summoner.model';
import { DATA_SUMMONER_ICON_URL } from 'src/constants/api/api.constants';

@Component({
  selector: 'app-page-summoner',
  templateUrl: './page-summoner.component.html',
  styleUrls: ['./page-summoner.component.scss']
})
export class PageSummonerComponent implements OnInit {

  profileIconUrl = DATA_SUMMONER_ICON_URL;
  doneLoading = false;
  summoner: Summoner;

  constructor(
    private summonerService: SummonerService,
    private route: ActivatedRoute,
  ) { }

  async ngOnInit() {
    const summonerName = this.route.snapshot.paramMap.get('name');
    await this.getSummonerByName(summonerName);

    this.doneLoading = true;
  }

  async getSummonerByName(summonerName: string) {
    await this.summonerService.getSummonerByName(summonerName)
    .then(
      (data) => this.summoner = data
    );
  }

}
