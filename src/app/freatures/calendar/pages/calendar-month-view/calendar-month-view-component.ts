import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCalendarModule } from 'ng-zorro-antd/calendar';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { LunarUtil } from '../../../../_utils';
import { CalendarStore } from '../../data-access';
import { CalendarEventPopoverComponent, CalendarEventTagComponent } from '../../ui';

@Component({
  selector: 'calendar-month-view',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    CalendarEventTagComponent,
    CalendarEventPopoverComponent,

    NzCalendarModule,
    NzButtonModule,
    NzGridModule,
    NzIconModule,
    NzPopoverModule
  ],
  templateUrl: './calendar-month-view-component.html',
  styleUrl: './calendar-month-view-component.css'
})
export class CalendarMonthViewComponent {
  public readonly store = inject(CalendarStore);

  createPopoverVisible: boolean = false;

  constructor() {}

  selectChange(select: Date): void {
    this.store.selectDate(select)
  }

  getLunarDay(date: Date) {
    return LunarUtil.main(date)
  }


  check(date: Date, $event: Date) {
    return this.formatDate(new Date(date)) == this.formatDate($event);
  }

  formatDate(date: Date) {
    const dateAsArr = date.toLocaleDateString('en-GB').split("/");
    const dd = dateAsArr[0];
    const mm = dateAsArr[1];
    const yy = dateAsArr[2];

    return `${dd}-${mm}-${yy}`
  }

  selectEvent(id: string) {
    this.store.selectEvent(id)
  }

  closePopover() {
    this.createPopoverVisible = false;
  }
}
