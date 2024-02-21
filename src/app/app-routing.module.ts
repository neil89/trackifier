import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TimerMainDashboardComponent } from './containers/timer-main-dashboard/timer-main-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: TimerMainDashboardComponent
  },
  // {
  //   path: 'new-game',
  //   loadChildren: () => import('./new-game/new-game.module').then( m => m.NewGameModule )
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
