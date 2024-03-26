import { DatePipe, TitleCasePipe } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Input, OnInit, QueryList, Renderer2, ViewChildren } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

import { TrackTaskDialogComponent } from '../track-task-dialog';
import { TrackingBox } from '@app/shared/models/timer-main-dashboard.model';
import { Project } from '@app/shared/models/project.model';


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

  @ViewChildren('divisionSlot') divisionSlot!: QueryList<ElementRef>;

  @Input({required: true}) public selectedDate!: Date;
  locale: string = 'en';

  @Input() public projects: Project[] | null = [];

  scheduleTime = new Array<string>(15);
  dialogRef: DynamicDialogRef | undefined;


  constructor(
    private renderer: Renderer2,
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
          selectedDivision,
          projects: this.projects
        },
        header: this.translate.instant('timerMainDashboard.TRACK-TASK-TITLE'),
        width: '90%',
        modal: true
      }
    );

    this.dialogRef.onClose.subscribe((trackingBoxData: TrackingBox) => {
      console.log('Data: ', trackingBoxData);
      if(trackingBoxData && this.divisionSlot.length > 0) {
        const divisionStep = this.divisionSlot.get(1)?.nativeElement.dataset.division -
          this.divisionSlot.get(0)?.nativeElement.dataset.division;
        this.addTrackingBox(trackingBoxData, divisionStep);
      }
    });

  }

  public addTrackingBox(tracking: TrackingBox, divisionStep: number): void {

    const startHourSearch = tracking.startTime.hours.toString().padStart(2, '0') + ':00';
    const startMinute = (divisionStep * Math.floor(tracking.startTime.minutes / divisionStep)).toString();
    const endHour = tracking.endTime.hours.toString().padStart(2, '0') + ':00';
    const endMinute = (divisionStep * Math.floor(tracking.endTime.minutes / divisionStep)).toString();

    const startSlot = this.divisionSlot.find( x =>
      x.nativeElement.dataset.hour == startHourSearch &&
      x.nativeElement.dataset.division == startMinute
    );

    const endSlot = this.divisionSlot.find( x =>
      x.nativeElement.dataset.hour == endHour &&
      x.nativeElement.dataset.division == endMinute
    );

    const startQuarterOffset = (tracking.startTime.minutes % divisionStep) * startSlot?.nativeElement.offsetHeight / divisionStep;
    const endQuarterOffset = (tracking.endTime.minutes % divisionStep) * endSlot?.nativeElement.offsetHeight / divisionStep;

    const top = startSlot?.nativeElement.offsetTop + startQuarterOffset;
    const left = startSlot?.nativeElement.offsetLeft;
    const height = (endSlot?.nativeElement.offsetTop - startSlot?.nativeElement.offsetTop)
      - startQuarterOffset + endQuarterOffset;
    const width = endSlot?.nativeElement.offsetWidth;

    const trackingBox = this.renderer.createElement('div');
    this.renderer.setStyle(trackingBox, 'position', 'absolute');
    this.renderer.setStyle(trackingBox, 'top', top + 'px');
    this.renderer.setStyle(trackingBox, 'left', left + 'px');
    this.renderer.setStyle(trackingBox, 'width', width + 'px');
    this.renderer.setStyle(trackingBox, 'height', height + 'px');
    this.renderer.setStyle(trackingBox, 'background-color', '#f8aa1f');
    this.renderer.setStyle(trackingBox, 'border', '1px solid #f8aa1f');
    this.renderer.appendChild(document.body, trackingBox);

    // console.log(`y: ${trackingBoxY}, x: ${trackingBoxX} | width: ${trackingBoxWidth}`);
  }
}
