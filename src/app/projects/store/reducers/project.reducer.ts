import { createReducer, on } from "@ngrx/store";

import {
  getAllProjectsSuccess,
  getProjectByName
} from "../actions/project.actions";
import { ProjectsState } from "@app/shared/models/timer-main-dashboard.model";


const initialProjectsState: ProjectsState = {
  projects: []
};

export const projectReducer = createReducer<ProjectsState>(
  initialProjectsState,

  on(getAllProjectsSuccess, (state, action): ProjectsState => {
    return {
      ...state,
      projects: action.projects
    }
  }),
)
