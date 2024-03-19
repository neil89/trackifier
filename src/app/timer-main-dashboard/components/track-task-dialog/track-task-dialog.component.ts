import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { ToggleButtonChangeEvent, ToggleButtonModule } from 'primeng/togglebutton';
import { InputMask, InputMaskModule } from 'primeng/inputmask';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DateTime, Duration } from 'luxon';
import { JsonPipe, Time } from '@angular/common';

import { Project } from '@app/shared/models/project.model';
import { TrackingBox } from '@app/shared/models/timer-main-dashboard.model';
import { ProjectsDropdownComponent } from '@app/shared/components/projects-dropdown/projects-dropdown.component';

@Component({
  selector: 'app-track-task-dialog',
  standalone: true,
  imports: [
    AutoCompleteModule,
    ButtonModule,
    InputMaskModule,
    ToggleButtonModule,
    ReactiveFormsModule,
    TranslateModule,
    ProjectsDropdownComponent,
    JsonPipe
  ],
  templateUrl: './track-task-dialog.component.html',
  styleUrl: './track-task-dialog.component.scss'
})
export class TrackTaskDialogComponent {

  public formGroup!: FormGroup;

  startDateTimeLuxon: DateTime | null = null;
  endDateTimeLuxon: DateTime | null = null;
  durationLuxon: Duration = Duration.fromObject({ hour: 0, minute: 0 });

  startTimePassedData: Time = {hours: 0, minutes: 0};
  endTimePassedData: Time = {hours: 0, minutes: 0};

  projects: Project[] = [];
  filteredProjecs: Project[] = [];

  constructor(
    private dialogConfig: DynamicDialogConfig,
    private dialogRef: DynamicDialogRef,
    public translate: TranslateService
  ) {

    this.projects = dialogConfig.data.projects;

    this.durationLuxon = Duration.fromObject({minutes: 15});

    this.startDateTimeLuxon = DateTime.fromObject({
      year: dialogConfig.data.selectedDate.getFullYear(),
      month: dialogConfig.data.selectedDate.getMonth()+1,
      day: dialogConfig.data.selectedDate.getDate(),
      hour: +dialogConfig.data.selectedHour.split(':')[0],
      minute: +dialogConfig.data.selectedDivision
    });
    this.endDateTimeLuxon = this.startDateTimeLuxon.plus(this.durationLuxon);
  }

  ngOnInit() {

    this.formGroup = new FormGroup({
      selectedProject: new FormControl<Project | null>(null),

      startTime: new FormControl<string | null>(
        this.startDateTimeLuxon?.toFormat('HH:mm') || null
      ),
      lockStartTime: new FormControl<boolean>(false),

      endTime: new FormControl<string | null>(
        this.endDateTimeLuxon?.toFormat('HH:mm') || null
      ),
      lockEndTime: new FormControl<boolean>(false),

      duration: new FormControl<string | null>("00:15"),  // can be configured depending on zoom
      lockDuration: new FormControl<boolean>(false),
    });
  }

  public get startTime(): string {
    return this.formGroup.get('startTime')?.value || "";
  }
  public get lockStartTime(): boolean {
    return this.formGroup.get('lockStartTime')?.value || false;
  }
  public get endTime(): string {
    return this.formGroup.get('endTime')?.value || "";
  }
  public get lockEndTime(): boolean {
    return this.formGroup.get('lockEndTime')?.value || false;
  }
  public get duration(): string {
    return this.formGroup.get('duration')?.value || "";
  }
  public get lockDuration(): boolean {
    return this.formGroup.get('lockDuration')?.value || false;
  }

  private updateStartTimeLuxon(): boolean {
    if(!this.startTime) {
      if(this.endTime && this.duration) {
        this.updateEndTimeLuxon();
        this.updateDurationLuxon();
        this.formGroup.patchValue({
          startTime: this.endDateTimeLuxon!.minus(this.durationLuxon).toFormat('HH:mm')
        });
      }
      else {
        return false;
      }
    }
    this.startDateTimeLuxon = DateTime.fromObject({
      hour: +this.startTime.split(':')[0],
      minute: +this.startTime.split(':')[1]
    });

    return true;
  }
  private updateEndTimeLuxon(): boolean {
    if(!this.endTime) {
      if(this.startTime && this.duration) {
        this.updateStartTimeLuxon();
        this.updateDurationLuxon();
        this.formGroup.patchValue({
          endTime: this.startDateTimeLuxon!.plus(this.durationLuxon).toFormat('HH:mm')
        });
      }
      else {
        return false;
      }
    }

    this.endDateTimeLuxon = DateTime.fromObject({
      hour: +this.endTime.split(':')[0],
      minute: +this.endTime.split(':')[1]
    });

    return true;
  }
  private updateDurationLuxon(): boolean {
    if(!this.duration) {
      if(this.startTime && this.endTime) {
        this.updateStartTimeLuxon();
        this.updateEndTimeLuxon();

        const duration = this.endDateTimeLuxon!.diff(
          this.startDateTimeLuxon!,
          ["hours", "minutes"]
        );

        this.formGroup.patchValue({
          duration: `${duration.hours.toString().padStart(2, '0')}:${duration.minutes.toString().padStart(2, '0')}`
        });
      }
      else {
        return false;
      }
    }
    this.durationLuxon = Duration.fromObject({
      hours: +this.duration.split(':')[0],
      minutes: +this.duration.split(':')[1]
    });

    return true;
  }

  public updateInputs(input: InputMask): void {

    if(this.updateDurationLuxon() &&
      this.updateStartTimeLuxon() &&
      this.updateEndTimeLuxon()
    ) {

      const inputId = input.el.nativeElement.id;

      switch(inputId) {
        case 'startTimeInput':

          if(this.lockEndTime) {
            this.updateDuration();
          }
          else {
            this.updateEndTime();
          }

          break;

        case 'endTimeInput':

            if(this.lockDuration) {
              this.updateStartTime();
            }
            else {
              this.updateDuration();
            }

            break;

        case 'durationInput':

          if(this.lockEndTime) {
            this.updateStartTime();
          }
          else {
            this.updateEndTime();
          }

          break;
      }
    }
  }

  private updateDuration(): void {
    this.durationLuxon = this.endDateTimeLuxon!.diff(this.startDateTimeLuxon!, ["hours", "minutes"]);
    this.formGroup.patchValue({
      duration: `${
          this.durationLuxon.hours.toString().padStart(2, '0')
        }:${
          this.durationLuxon.minutes.toString().padStart(2, '0')
        }`
    });
  }

  private updateStartTime(): void {
    this.startDateTimeLuxon = this.endDateTimeLuxon?.minus(this.durationLuxon) || null;
    this.formGroup.patchValue({
      startTime: this.startDateTimeLuxon?.toFormat('HH:mm') || ""
    });
  }

  private updateEndTime(): void {
    this.endDateTimeLuxon = this.startDateTimeLuxon?.plus(this.durationLuxon) || null;
    this.formGroup.patchValue({
      endTime: this.endDateTimeLuxon?.toFormat('HH:mm') || ""
    });
  }


  public lockOn(ev: ToggleButtonChangeEvent, controlName: string): void {

    const inputName = controlName.replace('lock', '').charAt(0).toLowerCase() + controlName.slice(5);
    const isLocked = this.formGroup.get(controlName)?.value;

    this.formGroup.get('startTime')?.enable();
    this.formGroup.get('endTime')?.enable();
    this.formGroup.get('duration')?.enable();
    this.formGroup.get('lockStartTime')?.setValue(false);
    this.formGroup.get('lockEndTime')?.setValue(false);
    this.formGroup.get('lockDuration')?.setValue(false);

    // It's true because it was just clicked
    if(isLocked) {
      this.formGroup.get(inputName)?.disable();
      this.formGroup.get(controlName)?.setValue(true);
    }
  }


  projectSelected(selectedProject: Project | null) {
    console.log(selectedProject);
    this.formGroup.get('selectedProject')?.setValue(selectedProject);
  }


  public register(): void {

    this.updateStartTimeLuxon();
    this.updateEndTimeLuxon();
    this.updateDurationLuxon();

      const trackingBox = {
        project: this.formGroup.get('selectedProject')?.value,
        startTime: {
          hours: this.startDateTimeLuxon?.hour,
          minutes: this.startDateTimeLuxon?.minute
        } as Time,
        endTime: {
          hours: this.endDateTimeLuxon?.hour,
          minutes: this.endDateTimeLuxon?.minute
        } as Time,
        duration: {
          hours: this.durationLuxon.hours,
          minutes: this.durationLuxon.minutes
        } as Time,
        tags: []
      };

      this.dialogRef.close(trackingBox as TrackingBox);
  }
}
