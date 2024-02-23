import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackTaskDialogComponent } from './track-task-dialog.component';

describe('TrackTaskDialogComponent', () => {
  let component: TrackTaskDialogComponent;
  let fixture: ComponentFixture<TrackTaskDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrackTaskDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrackTaskDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
