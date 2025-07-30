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
import { VocabularyTrackerService } from '../../data-access/vocabulary-tracker.service';
import { NzSpinModule } from 'ng-zorro-antd/spin';

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

    ReactiveFormsModule
  ],
  providers: [VocabularyTrackerService],
  standalone: true,
  templateUrl: './vocabulary-drawer-component.html',
  styleUrl: './vocabulary-drawer-component.css'
})
export class VocabularyDrawerComponent {

  private fb = inject(NonNullableFormBuilder);
  private service = inject(VocabularyTrackerService);
  isSpinning = false;
  visible = true


  exampleSentences: {
    id: number,
    sentence: string | null,
    meaning: string| null,
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

  generateWord(word: string) { 
    this.isSpinning = true;
    this.service.getWordFromAI(word).subscribe({
      next: (res) => {
        this.validateForm.patchValue({
          word: res.data.word,
          pronunciation: res.data.pronunciation,
          translation: res.data.translation,
          meaning: res.data.meaning,
          level: res.data.level,
          partsOfSpeech: res.data.partsOfSpeech,
        });

        this.exampleSentences = res.data.examples.map((sentence: any, index: number) => ({
          id: index + 1,
          sentence: sentence.sentence,
          meaning: sentence.meaning,
          pronunciation: sentence.pronunciation
        }));

            this.isSpinning = false;
      }
  })
}


  onAskAi() {
    const word = this.askAIForm.get('word')?.value as string;
    this.generateWord(word)
}
}

