import { ProjectsState } from '@app/models/timer-main-dashboard.model';
export * from './reducers';
export * from './actions';
export * from './selectors';

export interface State {
  project: ProjectsState;
}
