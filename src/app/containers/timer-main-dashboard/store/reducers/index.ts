import { ActionReducerMap } from "@ngrx/store";

import { timerMainDashboardReducer } from "./timer-main-dashboard.reducer";
import { State } from "..";


export const reducers: ActionReducerMap<State> = {
  timerMainDashboard: timerMainDashboardReducer
}
