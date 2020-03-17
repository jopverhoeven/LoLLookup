import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageSummonerComponent } from './page-summoner.component';

describe('PageSummonerComponent', () => {
  let component: PageSummonerComponent;
  let fixture: ComponentFixture<PageSummonerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageSummonerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageSummonerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
