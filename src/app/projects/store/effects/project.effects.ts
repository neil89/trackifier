import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ProjectService } from "@services/projects.service";
import { getAllProjects, getAllProjectsSuccess } from "../actions";
import { map, mergeMap, tap } from "rxjs";


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
        mergeMap(() => this.projectService.getProjects()
          .pipe(
            map((projects) => {
              console.log("Received projects");
              return getAllProjectsSuccess({ projects: { projects }}) })
            )
        ),
        tap((projects) => console.log(projects))        
      );
    }
  );
}
