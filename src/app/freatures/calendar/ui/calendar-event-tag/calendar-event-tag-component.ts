import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NzTagModule } from 'ng-zorro-antd/tag';

@Component({
  selector: 'calendar-event-tag',
  imports: [
      CommonModule,
    NzTagModule
  ],
  templateUrl: './calendar-event-tag-component.html',
  styleUrl: './calendar-event-tag-component.css'
})
export class CalendarEventTagComponent {
  @Input({ required: true}) eventObj!:  any
}
