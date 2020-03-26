export class BackEnd {
  // private apiUrl = 'https://api.lollookup.nl/';
  private apiUrl = 'http://localhost:3000/';
  private region: string;
  private summonerUrl = '/summoner/:summonerName';
  private championUrl = 'champion/:championId';
  private rankedUrl = '/ranked/:summonerId';
  private matchHistoryUrl = '/match/:accountId?start=:start&end=:end';
  private matchUrl = '/match/:matchId/:summonerId';
  private regionUrl = 'region';
  private masteryUrl = '/mastery/:summonerId';

  setRegion(region: string) {
    this.region = region.toLowerCase();
  }

  getSummonerURL(summonerName: string) {
    return (
      this.apiUrl +
      this.region +
      this.summonerUrl.replace(':summonerName', summonerName)
    );
  }

  getMasteryURL(summonerId: string) {
    return (
      this.apiUrl +
      this.region +
      this.masteryUrl.replace(':summonerId', summonerId)
    );
  }

  getChampionURL(championId: number) {
    return (
      this.apiUrl + this.championUrl.replace(':championId', '' + championId)
    );
  }

  getRankedURL(summonerId: string) {
    return (
      this.apiUrl +
      this.region +
      this.rankedUrl.replace(':summonerId', summonerId)
    );
  }

  getMatchHistoryURL(accountId: string, start: number, end: number) {
    return (
      this.apiUrl +
      this.region +
      this.matchHistoryUrl
        .replace(':accountId', accountId)
        .replace(':start', '' + start)
        .replace(':end', '' + end)
    );
  }

  getMatchURL(matchId: number, summonerId: string) {
    return (
      this.apiUrl +
      this.region +
      this.matchUrl
        .replace(':matchId', '' + matchId)
        .replace(':summonerId', summonerId)
    );
  }

  getRegionURL() {
    return this.apiUrl + this.regionUrl;
  }
}
