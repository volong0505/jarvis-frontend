import { Component, inject } from '@angular/core';
import { FormsModule, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { VocabularyTrackerService } from '../../data-access/vocabulary-tracker.service';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { VocabularyTableComponent } from '../vocabulary-table/vocabulary-table-component';
import { VocabularyTrackerStore } from '../../data-access';

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
    NzSpinModule,

    ReactiveFormsModule,
    FormsModule,

  ],
  standalone: true,
  templateUrl: './vocabulary-drawer-component.html',
  styleUrl: './vocabulary-drawer-component.css'
})
export class VocabularyDrawerComponent {

  private fb = inject(NonNullableFormBuilder);
  public readonly store = inject(VocabularyTrackerStore);

  isSpinning = false;
  visible = true


  exampleSentences: {
    id: number,
    sentence: string | null,
    meaning: string | null,
    pronunciation: string | null,
  }[] = [];

  partsOfSpeechOptions = [
    { label: 'Noun', value: 'noun' },
    { label: 'Verb', value: 'verb' },
    { label: 'Adjective', value: 'adjective' },
    { label: 'Adverb', value: 'adverb' },
    { label: 'Pronoun', value: 'pronoun' },
    { label: 'Preposition', value: 'preposition' },
    { label: 'Conjunction', value: 'conjunction' },
    { label: 'Interjection', value: 'interjection' }
  ];

  validateForm = this.fb.group({
    word: this.fb.control(''),
    pronunciation: this.fb.control(''),
    translation: this.fb.control(''),
    meaning: this.fb.control(''),
    level: this.fb.control(''),
    partsOfSpeech: this.fb.control(''),
  });

  askAIForm = this.fb.group({
    word: this.fb.control(''),
  });


  close() {
    this.visible = false
  }

  submitForm() {
    console.log('submit', this.validateForm.value);
    console.log('exampleSentences', this.exampleSentences);
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

  async generateWord(word: string) {
    this.isSpinning = true;
    const data = await this.store.getWordFromAI(word)

    if (data) {
      this.validateForm.patchValue({
        word: data.word,
        pronunciation: data.pronunciation,
        translation: data.translation,
        meaning: data.meaning,
        level: data.level,
        partsOfSpeech: data.partsOfSpeech,
      });

      this.exampleSentences = data.examples.map((sentence: any, index: number) => ({
        id: index + 1,
        sentence: sentence.sentence,
        meaning: sentence.meaning,
        pronunciation: sentence.pronunciation
      }));
    }
  }

  onAskAi() {
    const word = this.askAIForm.get('word')?.value as string;
    this.generateWord(word)
  }

  removeSentece(id: number) {
    this.exampleSentences = this.exampleSentences.filter(s => s.id !== id);
  }
}

