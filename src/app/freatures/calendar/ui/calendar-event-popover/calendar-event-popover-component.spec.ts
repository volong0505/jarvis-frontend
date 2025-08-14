import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarEventPopover } from './calendar-event-popover-component';

describe('CalendarEventPopover', () => {
  let component: CalendarEventPopover;
  let fixture: ComponentFixture<CalendarEventPopover>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendarEventPopover]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarEventPopover);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
