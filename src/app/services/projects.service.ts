import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Project } from '@app/shared/models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(
    private firestore: AngularFirestore
  ) { }

  public getProjects() {
    return this.firestore
      .collection<Project>('Projects')
      .valueChanges({ idField: 'id'});
  }
}
// Rest of the code...
