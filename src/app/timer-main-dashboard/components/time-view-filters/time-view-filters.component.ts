import { DatePipe, JsonPipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { DateTime } from 'luxon';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { DurationPipe } from '@app/shared/pipes/duration.pipe';
import { Project } from '@app/shared/models/project.model';
import { TranslateModule } from '@ngx-translate/core';
import { ProjectsDropdownComponent } from '@app/shared/components/projects-dropdown/projects-dropdown.component';


@Component({
  selector: 'app-time-view-filters',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    DatePipe,
    DurationPipe,
    TranslateModule,
    JsonPipe,
    ProjectsDropdownComponent
  ],
  templateUrl: './time-view-filters.component.html',
  styleUrl: './time-view-filters.component.scss'
})
export class TimeViewFiltersComponent implements OnInit {

  @Input({required: true}) public currentDate!: Date;
  currentDateLx: DateTime | null = null;
  totalTimeWeek: number = 0;

  @Input() public projects: Project[] | null = [];
  filteredProjecs: Project[] = [];

  public formGroup!: FormGroup;

  ngOnInit() {
    this.currentDateLx = DateTime.fromJSDate(this.currentDate);

    this.formGroup = new FormGroup({
      selectedProject: new FormControl<Project | null>(null)
    });
  }

  projectSelected(selectedProject: Project | null) {
    //console.log(selectedProject);

    // if(!this.projects) {
    //   return;
    // }

    // let filtered: Project[] = [];
    // let query = ev.query;
    // for (let i = 0; i < this.projects.length; i++) {
    //     let project = this.projects[i];
    //     if (project.name.toLowerCase().indexOf(query.toLowerCase()) >= 0) {
    //         filtered.push(project);
    //     }
    // }
    // this.filteredProjecs = filtered;
  }
}
