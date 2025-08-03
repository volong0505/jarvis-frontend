import { Component, inject } from '@angular/core';
import { VocabularyDrawerComponent, VocabularyTableComponent } from '../../ui';
import { VocabularyTrackerStore } from '../../data-access';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-vocabulary-list-component',
  imports: [
    VocabularyDrawerComponent,
    VocabularyTableComponent,

    NzButtonModule
  ],
  templateUrl: './vocabulary-list-component.html',
  styleUrl: './vocabulary-list-component.css'
})
export class VocabularyListComponent {
  public readonly store = inject(VocabularyTrackerStore);
}
