import { createReducer, on } from "@ngrx/store";

import {
  getAllProjects,
  getAllProjectsSuccess,
  getProjectByName
} from "../actions/project.actions";
import { ProjectsState } from "@app/models/timer-main-dashboard.model";




const initialProjectsState: ProjectsState = {
  projects: []
};

export const projectReducer = createReducer<ProjectsState>(
  initialProjectsState,
  on(getAllProjectsSuccess, (state) => {
    return {
      ...state,
      projects: state.projects
    }
  }),
)
