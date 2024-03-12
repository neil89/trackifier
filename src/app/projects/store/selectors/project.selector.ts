import { createFeatureSelector, createSelector } from "@ngrx/store";

import { ProjectsState } from "@app/models/timer-main-dashboard.model";


export const selectProjectFeatureState = 
    createFeatureSelector<ProjectsState>('project');

export const selectAllProjects = createSelector(
    selectProjectFeatureState,
    (state: ProjectsState) => state?.projects
)