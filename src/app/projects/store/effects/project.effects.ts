import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ProjectService } from "@services/projects.service";
import { getAllProjects, getAllProjectsSuccess } from "../actions";
import { map, switchMap, tap } from "rxjs";
import { Project } from "@app/models/project.model";
import { ProjectsState } from "@app/models/timer-main-dashboard.model";


@Injectable()
export class ProjectEffects {

  constructor(
    private actions$: Actions,
    private projectService: ProjectService
  ) {}

  getAllProjects$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(getAllProjects),
        switchMap(() => this.projectService.getProjects()
          .pipe(
            map((projects: Project[]) => {
              const clonedProjects = JSON.parse(JSON.stringify(projects)) as Project[];
              return getAllProjectsSuccess({ projects: clonedProjects });
            })
          )
        ),
      );
    }
  );
}
