import { createReducer, on } from "@ngrx/store";

import {
  setCurrentDate,
  setSelectedDate,
  setEndDateRange,
  setStartDateRange
} from "../actions/timer-main-dashboard.actions";
import { TimerMainDashboardState } from "src/app/models/timer-main-dashboard.model";

const initialTimerMainDashboardState: TimerMainDashboardState = {
  currentDate: new Date(),
  selectedDate: new Date(),
  startDateRange: undefined,
  endDateRange: undefined
};

export const timerMainDashboardReducer = createReducer<TimerMainDashboardState>(
  initialTimerMainDashboardState,
  on(setCurrentDate, (state, action): TimerMainDashboardState => {
    return {
      ...state,
      currentDate: action.currentDate
    };
  }),
  on(setSelectedDate, (state, action): TimerMainDashboardState => {
    return {
      ...state,
      selectedDate: action.selectedDate
    };
  }),
  on(setStartDateRange, (state, action): TimerMainDashboardState => {
    return {
      ...state,
      startDateRange: action.startDateRange
    };
  }),
  on(setEndDateRange, (state, action): TimerMainDashboardState => {
    return {
      ...state,
      endDateRange: action.endDateRange
    };
  })
)
