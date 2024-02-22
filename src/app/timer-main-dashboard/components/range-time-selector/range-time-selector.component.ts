import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { DateTime } from 'luxon';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';

import { TimerMainDashboardState } from '@models/timer-main-dashboard.model';


@Component({
  selector: 'app-range-time-selector',
  standalone: true,
  imports: [
    ButtonModule,
    CalendarModule,
    ReactiveFormsModule,
  ],
  templateUrl: './range-time-selector.component.html',
  styleUrl: './range-time-selector.component.scss'
})
export class RangeTimeSelectorComponent implements OnInit {

  selectedDate: Date | undefined;
  dateRangeStart: DateTime = DateTime.now().startOf('week');
  dateRangeEnd: DateTime = DateTime.now().endOf('week');

  @Output() updateDates = new EventEmitter<TimerMainDashboardState>();

  public formGroup!: FormGroup;

  ngOnInit(): void {
    this.selectedDate = this.selectedDate ?? new Date();
    this.formGroup = new FormGroup({
      calendarDate: new FormControl<Date | null>(null),
    });

    this.emitDates();
  }

  getRangeTime(): string {
    return `${this.dateRangeStart.toLocaleString()} - ${this.dateRangeEnd.toLocaleString()}`;
  }

  previousWeek(): void {
    this.dateRangeStart = this.dateRangeStart.minus({ weeks: 1 });
    this.dateRangeEnd = this.dateRangeEnd.minus({ weeks: 1 });

    this.emitDates();
  }

  nextWeek(): void {
    this.dateRangeStart = this.dateRangeStart.plus({ weeks: 1 });
    this.dateRangeEnd = this.dateRangeEnd.plus({ weeks: 1 });

    this.emitDates();
  }

  public onSelect(selectedDate: Date): void {
    this.selectedDate = selectedDate;
    this.dateRangeStart = DateTime.fromJSDate(selectedDate).startOf('week');
    this.dateRangeEnd = DateTime.fromJSDate(selectedDate).endOf('week');

    this.emitDates();
  }

  private emitDates(): void {

    this.updateDates.emit({
      currentDate: new Date(),
      selectedDate: this.selectedDate!,
      startDateRange: this.dateRangeStart.toJSDate(),
      endDateRange: this.dateRangeEnd.toJSDate()
    });
  }
}
