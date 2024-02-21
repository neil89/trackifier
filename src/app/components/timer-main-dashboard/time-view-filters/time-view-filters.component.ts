import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DateTime } from 'luxon';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { DurationPipe } from '@pipes/duration.pipe';
import { Project } from '@models/project.model';


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
    DurationPipe
  ],
  templateUrl: './time-view-filters.component.html',
  styleUrl: './time-view-filters.component.scss'
})
export class TimeViewFiltersComponent implements OnInit {

  @Input({required: true}) public currentDate!: Date;
  currentDateLx: DateTime | null = null;
  totalTimeWeek: number = 0;

  public formGroup!: FormGroup;
  projects: Project[] = [];
  filteredProjecs: Project[] = [];

  ngOnInit() {
    this.currentDateLx = DateTime.fromJSDate(this.currentDate);

    this.formGroup = new FormGroup({
      selectedProject: new FormControl<Project | null>(null)
    });

    // 3 sample projects to test
    this.projects = [
      {
        id: '1',
        name: 'Project 1',
        description: 'Sample project 1',
      },
      {
        id: '2',
        name: 'Project 2',
        description: 'Sample project 2',
      },
      {
        id: '3',
        name: 'Project 3',
        description: 'Sample project 3',
      }
    ];
  }

  projectSelected(ev: any) {
    console.log(ev);

    let filtered: any[] = [];
    let query = ev.query;
    for (let i = 0; i < (this.projects as any[]).length; i++) {
        let country = (this.projects as any[])[i];
        if (country.name.toLowerCase().indexOf(query.toLowerCase()) >= 0) {
            filtered.push(country);
        }
    }
    this.filteredProjecs = filtered;
  }
}
