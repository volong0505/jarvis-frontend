import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTypographyModule } from 'ng-zorro-antd/typography';

@Component({
  selector: 'vocabulary-drawer-component',
  imports: [
    NzDrawerModule,
    NzInputModule,
    NzIconModule,
    NzFormModule,
    NzTypographyModule,
    NzSelectModule,
    NzButtonModule,
    NzDividerModule,

    ReactiveFormsModule
  ],
  templateUrl: './vocabulary-drawer-component.html',
  styleUrl: './vocabulary-drawer-component.css'
})
export class VocabularyDrawerComponent {

  private fb = inject(NonNullableFormBuilder);

  exampleSentences: {
    id: number,
    sentence: string | null,
    meaning: string| null,
    pronunciation: string | null,
  }[] = [];

  validateForm = this.fb.group({
    word: this.fb.control(''),
    pronunciation: this.fb.control(''),
    translation: this.fb.control(''),
    meaning: this.fb.control(''),
    level: this.fb.control(''),
    partsOfSpeech: this.fb.control(''),
  });

  visible = true

  close() {
    this.visible = false
  }

  submitForm() {

  }

  addSentence(e?: MouseEvent): void {
    e?.preventDefault();

    const id = this.exampleSentences.length > 0 ? this.exampleSentences[this.exampleSentences.length - 1].id + 1 : 1;

    const control = {
      id,
      sentence: null,
      meaning: null,
      pronunciation: null,
    };
    const index = this.exampleSentences.push(control);
  }
}
