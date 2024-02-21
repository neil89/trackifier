import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RangeTimeSelectorComponent } from './range-time-selector.component';

describe('RangeTimeSelectorComponent', () => {
  let component: RangeTimeSelectorComponent;
  let fixture: ComponentFixture<RangeTimeSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RangeTimeSelectorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RangeTimeSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
