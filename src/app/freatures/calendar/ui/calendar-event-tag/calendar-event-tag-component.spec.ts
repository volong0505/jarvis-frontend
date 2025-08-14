import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarEventTagComponent } from './calendar-event-tag-component';

describe('CalendarEventTagComponent', () => {
  let component: CalendarEventTagComponent;
  let fixture: ComponentFixture<CalendarEventTagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendarEventTagComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarEventTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
