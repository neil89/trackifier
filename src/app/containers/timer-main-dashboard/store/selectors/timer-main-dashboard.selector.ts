import { createFeatureSelector, createSelector } from "@ngrx/store";

import { TimerMainDashboardState } from "src/app/models/timer-main-dashboard.model";


export const selectTimerMainDashboardFeatureState =
  createFeatureSelector<TimerMainDashboardState>('timerMainDashboard');

export const selectCurrentDate = createSelector(
  selectTimerMainDashboardFeatureState,
  (state: TimerMainDashboardState) => state.currentDate
);

export const selectedDate = createSelector(
  selectTimerMainDashboardFeatureState,
  (state: TimerMainDashboardState) => state.selectedDate
);

export const selectStartDateRange = createSelector(
  selectTimerMainDashboardFeatureState,
  (state: TimerMainDashboardState) => state.startDateRange
);

export const selectEndDateRange = createSelector(
  selectTimerMainDashboardFeatureState,
  (state: TimerMainDashboardState) => state.endDateRange
);
