import { Project } from '@app/models/project.model';
export * from './reducers';
export * from './actions';
//export * from './selectors';

export interface State {
  project: Project;
}
