import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AutoCompleteModule } from 'primeng/autocomplete';

import {
  Project,
  ProjectAutocompleteQueryEvent,
  ProjectAutocompleteSelectEvent
} from '@models/project.model';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-projects-dropdown',
  standalone: true,
  imports: [
    AutoCompleteModule,
    FormsModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './projects-dropdown.component.html',
  styleUrl: './projects-dropdown.component.scss'
})
export class ProjectsDropdownComponent {

  @Input() public forceSelection: boolean = true;
  @Input() public minLength: number = 1;

  @Input() public projects: Project[] | null = [];
  selectedProject: Project | null = null;
  filteredProjects: Project[] = [];

  @Output() public onProjectSelected: EventEmitter<Project | null> =
    new EventEmitter<Project | null>();


  projectsSearch(ev: ProjectAutocompleteQueryEvent) {

    if(!this.projects) {
      return;
    }

    let filtered: Project[] = [];
    let query = ev.query;
    for (let i = 0; i < this.projects.length; i++) {
        let project = this.projects[i];
        if (project.name.toLowerCase().indexOf(query.toLowerCase()) >= 0) {
            filtered.push(project);
        }
    }
    this.filteredProjects = filtered;
  }

  projectSelected(ev: ProjectAutocompleteSelectEvent | Event | undefined) {
    this.onProjectSelected.emit(this.selectedProject)
  }
}
