import { Component, inject } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { VocabularyTrackerStore } from '../../data-access';

@Component({
  selector: 'vocabulary-table-component',
  imports: [
    NzTableModule,
    NzButtonModule,
    NzTagModule,
    NzIconModule,
  ],
  templateUrl: './vocabulary-table-component.html',
  styleUrl: './vocabulary-table-component.css'
})
export class VocabularyTableComponent {
  public readonly store = inject(VocabularyTrackerStore);

  expandSet = new Set<string>();

  onExpandChange(id: string, checked: boolean): void {
    if (checked) {
      this.expandSet.add(id);
    } else {
      this.expandSet.delete(id);
    }
  }
}
