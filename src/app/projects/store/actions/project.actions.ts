import { ProjectsState } from "@app/models/timer-main-dashboard.model";
import { createAction, props } from "@ngrx/store";


export enum ProjectActionTypes {
  GET_ALL_PROJECTS = '[Projects] Get all projects',
  GET_ALL_PROJECTS_SUCCESS = '[Projects] Get all projects success',
  GET_PROJECT_BY_NAME = '[Projects] Get project by name',
  //CREATE_PROJECT = '[Projects] Create project',
  //UPDATE_PROJECT = '[Projects] Update project',
  //DELETE_PROJECT = '[Projects] Delete project',
}

export const getAllProjects = createAction(
  ProjectActionTypes.GET_ALL_PROJECTS,
);

export const getAllProjectsSuccess = createAction(
  ProjectActionTypes.GET_ALL_PROJECTS_SUCCESS,
  props<{ projects: ProjectsState }>()
);

export const getProjectByName = createAction(
  ProjectActionTypes.GET_PROJECT_BY_NAME,
  props<{ searchName: string }>()
);
