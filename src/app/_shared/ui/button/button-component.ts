import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'shared-ui-button-component',
  imports: [
    NzButtonModule
  ],
  templateUrl: './button-component.html',
  styleUrl: './button-component.css'
})
export class ButtonComponent {
  @Input() buttonText: string = 'Button';
  @Output() shareClicked = new EventEmitter<void>();

  onClick(): void {
    this.shareClicked.emit();
  }
}
