import { DatePipe, TitleCasePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TrackTaskDialogComponent } from '../track-task-dialog';


@Component({
  selector: 'app-timer-grid',
  standalone: true,
  imports: [
    DatePipe,
    TitleCasePipe,
    TranslateModule
  ],
  providers: [
    DialogService
  ],
  templateUrl: './timer-grid.component.html',
  styleUrl: './timer-grid.component.scss'
})
export class TimerGridComponent implements OnInit {

  @Input({required: true}) public selectedDate!: Date;
  locale: string = 'en';

  scheduleTime = new Array<string>(15);
  dialogRef: DynamicDialogRef | undefined;


  constructor(
    public dialogService: DialogService,
    private translate: TranslateService
  ) {
    this.locale = this.translate.currentLang;
  }

  ngOnInit() {
    this.scheduleTime = Array.from(this.scheduleTime).map((_, index) => {
      const hour = index + 7;
      return `${hour.toString().padStart(2, '0')}:00`;
    });
  }

  public show(ev: MouseEvent): void {
    const selectedHour: string | null = (ev.target as HTMLElement)?.getAttribute('data-hour');
    const selectedDivision: string | null = (ev.target as HTMLElement)?.getAttribute('data-division');

    this.dialogRef = this.dialogService.open(
      TrackTaskDialogComponent,  {
        data: {
          selectedDate: this.selectedDate,
          selectedHour,
          selectedDivision
        },
        header: this.translate.instant('timerMainDashboard.TRACK-TASK-TITLE'),
        width: '90%',
        modal: true
      }
    )
  }
}
