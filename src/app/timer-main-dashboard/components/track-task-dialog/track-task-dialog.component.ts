import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { ToggleButtonChangeEvent, ToggleButtonModule } from 'primeng/togglebutton';
import { InputMaskModule } from 'primeng/inputmask';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { DateTime, Duration } from 'luxon';
import { Time } from '@angular/common';


import { Project } from '@app/models/project.model';


@Component({
  selector: 'app-track-task-dialog',
  standalone: true,
  imports: [
    AutoCompleteModule,
    ButtonModule,
    InputMaskModule,
    ToggleButtonModule,
    ReactiveFormsModule,
    TranslateModule
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
  ) {

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

  public getStartTime(): string {
    return this.formGroup.get('startTime')?.value || "";
  }
  public getLockStartTime(): boolean {
    return this.formGroup.get('lockStartTime')?.value || false;
  }
  public getEndTime(): string {
    return this.formGroup.get('endTime')?.value || "";
  }
  public getLockEndTime(): boolean {
    return this.formGroup.get('lockEndTime')?.value || false;
  }
  public getDuration(): string {
    return this.formGroup.get('duration')?.value || "";
  }
  public getLockDuration(): boolean {
    return this.formGroup.get('lockDuration')?.value || false;
  }

  private updateStartTimeLuxon(): boolean {
    if(!this.getStartTime()) {
      if(this.getEndTime() && this.getDuration()) {
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
      hour: +this.getStartTime().split(':')[0],
      minute: +this.getStartTime().split(':')[1]
    });

    return true;
  }
  private updateEndTimeLuxon(): boolean {
    if(!this.getEndTime()) {
      if(this.getStartTime() && this.getDuration()) {
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
      hour: +this.getEndTime().split(':')[0],
      minute: +this.getEndTime().split(':')[1]
    });

    return true;
  }
  private updateDurationLuxon(): boolean {
    if(!this.getDuration()) {
      if(this.getStartTime() && this.getEndTime()) {
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
      hours: +this.getDuration().split(':')[0],
      minutes: +this.getDuration().split(':')[1]
    });

    return true;
  }

  public updateDuration(): void {

    if(this.updateDurationLuxon() &&
      this.updateStartTimeLuxon() &&
      this.updateEndTimeLuxon()
      ) {

      if(this.getLockEndTime()) {
        this.startDateTimeLuxon = this.endDateTimeLuxon?.minus(this.durationLuxon) || null;
        this.formGroup.patchValue({
          startTime: this.startDateTimeLuxon?.toFormat('HH:mm') || ""
        });
      }
      else {
        this.endDateTimeLuxon = this.startDateTimeLuxon?.plus(this.durationLuxon) || null;
        this.formGroup.patchValue({
          endTime: this.endDateTimeLuxon?.toFormat('HH:mm') || ""
        });
      }
    }
  }

  /*
    UNCHECK
  */

  public lockOn(ev: ToggleButtonChangeEvent, controlName: string): void {

    this.formGroup.get('startTime')?.enable();
    this.formGroup.get('endTime')?.enable();
    this.formGroup.get('duration')?.enable();
    this.formGroup.get('lockStartTime')?.setValue(false);
    this.formGroup.get('lockEndTime')?.setValue(false);
    this.formGroup.get('lockDuration')?.setValue(false);

    if (controlName === 'lockStartTime') {
      this.formGroup.get('startTime')?.disable();
      this.formGroup.get('lockStartTime')?.setValue(true);
    }
    if (controlName === 'lockEndTime') {
      this.formGroup.get('endTime')?.disable();
      this.formGroup.get('lockEndTime')?.setValue(true);
    }
    if (controlName === 'lockDuration') {
      this.formGroup.get('duration')?.disable();
      this.formGroup.get('lockDuration')?.setValue(true);
    }
  }
}
