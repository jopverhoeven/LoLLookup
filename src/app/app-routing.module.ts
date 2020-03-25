import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageHomeComponent } from './pages/page-home/page-home.component';
import { PageSummonerComponent } from './pages/page-summoner/page-summoner.component';

const routes: Routes = [
  {
    path: '',
    component: PageHomeComponent
  },
  {
    path: ':region',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'summoner/:name'
      },
      {
        path: 'summoner/:name',
        component: PageSummonerComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
