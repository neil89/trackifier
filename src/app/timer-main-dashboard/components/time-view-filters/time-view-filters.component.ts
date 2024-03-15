import { DatePipe, JsonPipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DateTime } from 'luxon';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { DurationPipe } from '@pipes/duration.pipe';
import { Project } from '@models/project.model';
import { TranslateModule } from '@ngx-translate/core';


interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}

@Component({
  selector: 'app-time-view-filters',
  standalone: true,
  imports: [
    AutoCompleteModule,
    ReactiveFormsModule,
    DatePipe,
    DurationPipe,
    TranslateModule,
    JsonPipe
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

  projectSelected(ev: any) {
    console.log(ev);

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
    this.filteredProjecs = filtered;
  }
}
