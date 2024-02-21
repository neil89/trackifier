import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { TimeViewFiltersComponent } from '@components/timer-main-dashboard/time-view-filters/time-view-filters.component';
import { RangeTimeSelectorComponent } from '@components/timer-main-dashboard/range-time-selector/range-time-selector.component';
import * as TimerMainDashboardActions from './store/index';

import { TimerMainDashboardState } from 'src/app/models/timer-main-dashboard.model';
import { TimerGridComponent } from '@app/components/timer-main-dashboard/timer-grid/timer-grid.component';


@Component({
  selector: 'app-timer-main-dashboard',
  standalone: true,
  imports: [
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

  constructor(
    private store: Store
  ) {
    this.updateDatesOnStore(this.updateDates);
  }

  ngOnInit() {
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
