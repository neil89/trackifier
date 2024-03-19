import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AutoCompleteModule } from 'primeng/autocomplete';

import {
  Project,
  ProjectAutocompleteQueryEvent,
  ProjectAutocompleteSelectEvent
} from '@models/project.model';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-projects-dropdown',
  standalone: true,
  imports: [
    AutoCompleteModule,
    ReactiveFormsModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './projects-dropdown.component.html',
  styleUrl: './projects-dropdown.component.scss'
})
export class ProjectsDropdownComponent implements OnInit{

  @Input() public projects: Project[] | null = [];
  filteredProjects: Project[] = [];

  @Output() public selectedProject: EventEmitter<Project | null> =
    new EventEmitter<Project | null>();

  formGroup!: FormGroup;

  ngOnInit() {
    this.formGroup = new FormGroup({
      selectedProject: new FormControl<Project | null>(null)
    });
  }

  projectsSearch(ev: ProjectAutocompleteQueryEvent) {
    //console.log(ev);

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
    console.log('projectSelected');
    console.log(ev);
    console.log(this.formGroup.get('selectedProject')?.value);
    console.log("----");

    // if(!ev) {
    //   this.selectedProject.emit(null);
    // }
    // else if(ev as ProjectAutocompleteSelectEvent) {
    //   ev = ev as ProjectAutocompleteSelectEvent;
    //   this.selectedProject.emit(ev.value as Project);
    // }
  }
}
