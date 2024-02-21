import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-timer-grid',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './timer-grid.component.html',
  styleUrl: './timer-grid.component.scss'
})
export class TimerGridComponent implements OnInit {

  @Input({required: true}) public selectedDate!: Date;

  scheduleTime = new Array<string>(15);

  constructor() {
  }

  ngOnInit() {
    this.scheduleTime = Array.from(this.scheduleTime).map((_, index) => {
      const hour = index + 7;
      return `${hour.toString().padStart(2, '0')}:00`;
    });
  }
}
