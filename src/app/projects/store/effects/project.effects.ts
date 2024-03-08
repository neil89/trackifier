import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ProjectService } from "@services/projects.service";
import { getAllProjects } from "../actions";
import { mergeMap, tap } from "rxjs";


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
        mergeMap(() => this.projectService.getProjects()),
        tap((projects) => console.log(projects))
      );
    },
    { dispatch: false }
  );

}
