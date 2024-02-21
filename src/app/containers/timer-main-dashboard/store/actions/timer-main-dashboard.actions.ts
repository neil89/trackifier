import { createAction, props } from "@ngrx/store";


export enum TimerMainDashboardActionTypes {
  SET_CURRENT_DATE = '[TimerMainDashboard] Set Current Date',
  SET_SELECTED_DATE = '[TimerMainDashboard] Set Selected Date',
  SET_START_DATE_RANGE = '[TimerMainDashboard] Set Start Date Range',
  SET_END_DATE_RANGE = '[TimerMainDashboard] Set End Date Range',
}

export const setCurrentDate = createAction(
  TimerMainDashboardActionTypes.SET_CURRENT_DATE,
  props<{ currentDate: Date }>()
);

export const setSelectedDate = createAction(
  TimerMainDashboardActionTypes.SET_SELECTED_DATE,
  props<{ selectedDate: Date }>()
);

export const setStartDateRange = createAction(
  TimerMainDashboardActionTypes.SET_START_DATE_RANGE,
  props<{ startDateRange: Date }>()
);

export const setEndDateRange = createAction(
  TimerMainDashboardActionTypes.SET_END_DATE_RANGE,
  props<{ endDateRange: Date }>()
);
