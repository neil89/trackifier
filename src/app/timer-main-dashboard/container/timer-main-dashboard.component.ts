import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

import { TimerMainDashboardState } from '@app/shared/models/timer-main-dashboard.model';
import { ProjectService } from '@app/services/projects.service';
import { Project } from '@app/shared/models/project.model';
import {
  TimeViewFiltersComponent,
  RangeTimeSelectorComponent,
  TimerGridComponent,
} from '../components';
import * as TimerMainDashboardActions from '../store/index';
import { selectAllProjects } from '@app/projects/store/selectors';
import { getAllProjects } from '@app/projects/store';


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
  projects$: Observable<any> | null = null;

  constructor(
    private store: Store,
    private projectsService: ProjectService
  ) {
    this.updateDatesOnStore(this.updateDates);
  }

  ngOnInit() {
    this.store.dispatch(getAllProjects());
    this.projects$ = this.store.select(selectAllProjects);
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
