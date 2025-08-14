import { Component, inject } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { VocabularyTrackerStore } from '../../data-access';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { ButtonComponent } from '../../../../_shared';

@Component({
  selector: 'vocabulary-table-component',
  imports: [
    NzTableModule,
    NzButtonModule,
    NzTagModule,
    NzIconModule,
    NzInputModule,
    NzFormModule,
    NzFlexModule,
    ReactiveFormsModule,

    ButtonComponent
  ],
  templateUrl: './vocabulary-table-component.html',
  styleUrl: './vocabulary-table-component.css'
})
export class VocabularyTableComponent {
  public readonly store = inject(VocabularyTrackerStore);
  private fb = inject(NonNullableFormBuilder);
  expandSet = new Set<string>();
  keyword = '';

  searchForm = this.fb.group({
    keyword: this.fb.control(''),
  });


  submitForm(): void {
    if (this.keyword !== this.searchForm.value.keyword) {
        this.keyword = this.searchForm.value.keyword || '';
        this.store.loadVocabularyList({ keyword: this.keyword });
    }

  }

  onExpandChange(id: string, checked: boolean): void {
    if (checked) {
      this.expandSet.add(id);
    } else {
      this.expandSet.delete(id);
    }
  }
}
