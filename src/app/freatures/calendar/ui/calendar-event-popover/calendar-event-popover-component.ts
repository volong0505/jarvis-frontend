import { CommonModule } from '@angular/common';
import { Component, DestroyRef, EventEmitter, inject, Output } from '@angular/core';
import { FormGroup, FormControl, NonNullableFormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { COLORS } from '../../../../_shared';
import { CalendarStore } from '../../data-access';
import { ColorUtil, DateUtil } from '../../../../_utils';

@Component({
  selector: 'calendar-event-popover',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    NzInputModule,
    NzFormModule,
    NzCheckboxModule,
    NzButtonModule,
    NzSelectModule,
    NzDividerModule,
    NzTimePickerModule,
    NzIconModule,
    NzDatePickerModule,
    NzDropDownModule,
    NzTagModule
  ],
  templateUrl: './calendar-event-popover-component.html',
  styleUrl: './calendar-event-popover-component.css'
})
export class CalendarEventPopoverComponent {
  private fb = inject(NonNullableFormBuilder);

   validateForm = this.fb.group({
    type: this.fb.control(''),
    title: this.fb.control(''),
    time_start: this.fb.control(''),
    date: this.fb.control(''),
    location: this.fb.control(''),
    links: this.fb.control(''),
    description: this.fb.control(''),
    color: this.fb.control(''),
  })

  @Output("closePopover") closePopover: EventEmitter<any> = new EventEmitter();

  public readonly store = inject(CalendarStore);
  eventObj: any = {};

  currentFormItemEdit: any = null;
  currentSelectedDate: Date = new Date();

  colors = COLORS;

  constructor(
  ) {
    const destroyRef = inject(DestroyRef);
    destroyRef.onDestroy(() => this.store.selectEvent(null));

    // this.validateForm = this.fb.group({
    //   type: this.eventObj?.type || 'Event',
    //   title: this.eventObj?.title || '',
    //   time_start: this.eventObj?.time_start ? DateUtil.stringToTime(this.eventObj?.time_start) : null,
    //   date: this.eventObj?.date || this.store.currentDate(),
    //   location: this.eventObj?.location || '',
    //   links: this.eventObj?.link || '',
    //   description: this.eventObj?.description || '',
    //   color: ColorUtil.colorToHex(this.eventObj?.color || 'blue')
    // });
  }

  mouseEnter(value: string): void {
    this.currentFormItemEdit = value;
  }

  mouseLeave(): void {
    this.currentFormItemEdit = null;
  }

  submitForm() {
    // this.onUpsert();
  }

  onUpsert() {
    this.closePopover.emit();

    const body = {
      _id: this.eventObj?._id || null,
      type: this.validateForm.controls['type'].value,
      title: this.validateForm.controls['title'].value,
      location: this.validateForm.controls['location'].value,
      date: this.validateForm.controls['date'].value,
      time_start: DateUtil.timeToString(new Date(this.validateForm.controls['time_start'].value)),
      link: this.validateForm.controls['links'].value,
      description: this.validateForm.controls['description'].value,
      color: ColorUtil.hexToColor(this.validateForm.controls['color'].value)
    }
    this.store.upsert(body);
  }

  onDelete() {
    if (this.eventObj?._id) this.store.delete(this.eventObj?._id)
  }


}
