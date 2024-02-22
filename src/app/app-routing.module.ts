import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TimerMainDashboardComponent } from './timer-main-dashboard/container/timer-main-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: TimerMainDashboardComponent
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
  // IMPORT ROUTES
  // {
  //   path: 'new-game',
  //   loadChildren: () => import('./new-game/new-game.module')
  //     .then( m => m.NewGameModule )
  // },
  // IMPORT COMPONENT
  // {
  //   path: 'new-game',
  //   loadComponent: () => import('.../time.component')
  //     .then(c => c.TimeComponent)
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
