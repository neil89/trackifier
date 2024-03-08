import { createReducer, on } from "@ngrx/store";
import { Project } from "@app/models/project.model";

import {
  getAllProjects,
  getProjectByName
} from "../actions/project.actions";
import { state } from "@angular/animations";




const initialProjectState: Project = {
  id: '',
  name: '',
  description: '',
};

export const projectReducer = createReducer<Project>(
  initialProjectState,
)
