import { DatePipe, TitleCasePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-timer-grid',
  standalone: true,
  imports: [
    DatePipe,
    TitleCasePipe,
    TranslateModule
  ],
  templateUrl: './timer-grid.component.html',
  styleUrl: './timer-grid.component.scss'
})
export class TimerGridComponent implements OnInit {

  @Input({required: true}) public selectedDate!: Date;
  locale: string = 'en';

  scheduleTime = new Array<string>(15);

  constructor(
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
}
