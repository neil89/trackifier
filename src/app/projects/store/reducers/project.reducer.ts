import { createReducer, on } from "@ngrx/store";
import { Project } from "@app/models/project.model";

import {
  getAllProjects,
  getProjectByName
} from "../actions/project.actions";
import { state } from "@angular/animations";
import { ProjectsState } from "@app/models/timer-main-dashboard.model";




const initialProjectsState: ProjectsState = {
  projects: []
};

export const projectReducer = createReducer<ProjectsState>(
  initialProjectsState,
)
