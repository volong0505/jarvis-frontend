import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { VocabularyTrackerStore } from '../../data-access';
import { VocabularyDrawerComponent, VocabularyTableComponent } from '../../ui';

@Component({
  selector: 'app-vocabulary-list-component',
  imports: [
    VocabularyDrawerComponent,
    VocabularyTableComponent,

  ],
  templateUrl: './vocabulary-list-component.html',
  styleUrl: './vocabulary-list-component.css'
})
export class VocabularyListComponent {
 
}
