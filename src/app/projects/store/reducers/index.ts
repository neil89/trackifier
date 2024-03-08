import { ActionReducerMap } from "@ngrx/store";

import { projectReducer } from "./project.reducer";
import { State } from "..";


export const reducers: ActionReducerMap<State> = {
  project: projectReducer
}
