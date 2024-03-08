import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import {
  TimeViewFiltersComponent,
  RangeTimeSelectorComponent,
  TimerGridComponent,
} from '../components';
import * as TimerMainDashboardActions from '../store/index';
import { TimerMainDashboardState } from '@models/timer-main-dashboard.model';
import { ProjectService } from '@app/services/projects.service';
import { Observable } from 'rxjs';
import { Project } from '@app/models/project.model';
import { CommonModule } from '@angular/common';
import { getAllProjects } from '../../projects/store/actions/project.actions';


@Component({
  selector: 'app-timer-main-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    TimeViewFiltersComponent,
    RangeTimeSelectorComponent,
    TimerGridComponent
  ],
  templateUrl: './timer-main-dashboard.component.html',
  styleUrl: './timer-main-dashboard.component.scss'
})
export class TimerMainDashboardComponent {

  currentDate: Date = new Date();
  updateDates: TimerMainDashboardState = {
    currentDate: this.currentDate,
    selectedDate: this.currentDate
  };
  projects$: Observable<Project[]> = this.projectsService.getProjects();

  constructor(
    private store: Store,
    private projectsService: ProjectService
  ) {
    this.updateDatesOnStore(this.updateDates);
  }

  ngOnInit() {
    // this.projects$
    //   .pipe(
    //     distinctUntilChanged()
    //   )
    //   .subscribe((projects: Project[]) => {
    //     console.log(projects);
    //     // this.store.dispatch( TimerMainDashboardActions.setProjects({
    //     //   projects: projects
    //     // }));
    //   }
    // );
    this.store.dispatch(getAllProjects());
  }

  public updateDatesOnStore(ev: TimerMainDashboardState) {
    this.updateDates = ev;
    this.store.dispatch( TimerMainDashboardActions.setCurrentDate({
      currentDate: this.updateDates.currentDate
    }));
    this.store.dispatch( TimerMainDashboardActions.setSelectedDate({
      selectedDate: this.updateDates.selectedDate
    }));

    if( this.updateDates.startDateRange && this.updateDates.endDateRange ) {
      this.store.dispatch( TimerMainDashboardActions.setStartDateRange({
        startDateRange: this.updateDates.startDateRange
      }));
      this.store.dispatch( TimerMainDashboardActions.setEndDateRange({
        endDateRange: this.updateDates.endDateRange
      }));
    }

    // use locale
  }
}
