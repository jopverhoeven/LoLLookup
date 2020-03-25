import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SummonerService } from 'src/app/services/summoner.service';
import { Region } from 'src/models/region/region.model';

@Component({
  selector: 'app-page-home',
  templateUrl: './page-home.component.html',
  styleUrls: ['./page-home.component.scss']
})
export class PageHomeComponent implements OnInit {
  searchForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private summonerService: SummonerService
  ) {}

  regions: Region[];
  doneLoadingRegions = false;
  selectedRegion: string;

  async ngOnInit() {
    this.searchForm = this.formBuilder.group({
      search: ['', Validators.required]
    });

    await this.summonerService.getRegions().then(data => {
      this.regions = data;
      this.selectedRegion = this.regions[0].internalname;
      this.doneLoadingRegions = true;
    });
  }

  onSubmit() {
    this.router.navigateByUrl(
      this.selectedRegion + '/summoner/' + this.searchForm.value.search
    );
  }

  get search() {
    return this.searchForm.get('search');
  }
}
