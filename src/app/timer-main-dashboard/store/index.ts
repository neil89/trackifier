import { TimerMainDashboardState } from '@app/shared/models/timer-main-dashboard.model';
export * from './reducers';
export * from './actions';
export * from './selectors';


export interface State {
  timerMainDashboard: TimerMainDashboardState;
}
