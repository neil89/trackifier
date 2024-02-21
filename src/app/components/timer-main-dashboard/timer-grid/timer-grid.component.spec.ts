import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimerGridComponent } from './timer-grid.component';

describe('TimerGridComponent', () => {
  let component: TimerGridComponent;
  let fixture: ComponentFixture<TimerGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimerGridComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TimerGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
