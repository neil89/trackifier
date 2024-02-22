import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeViewFiltersComponent } from './time-view-filters.component';

describe('TimeViewFiltersComponent', () => {
  let component: TimeViewFiltersComponent;
  let fixture: ComponentFixture<TimeViewFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimeViewFiltersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TimeViewFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
