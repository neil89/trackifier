import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimerMainDashboardComponent } from './timer-main-dashboard.component';

describe('TimerMainDashboardComponent', () => {
  let component: TimerMainDashboardComponent;
  let fixture: ComponentFixture<TimerMainDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimerMainDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TimerMainDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
