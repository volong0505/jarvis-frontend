import { Component, ElementRef, inject, OnDestroy, ViewChild } from '@angular/core';
import { FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { VocabularyTrackerStore } from '../../data-access';
import { SentenceExample } from '../../model/vocabulary.model';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { CreateVocabularyRequest } from '../../dto';
import { Subject } from 'rxjs';

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
    NzTagModule,

    ReactiveFormsModule,
    FormsModule,

  ],
  standalone: true,
  templateUrl: './vocabulary-drawer-component.html',
  styleUrl: './vocabulary-drawer-component.css'
})
export class VocabularyDrawerComponent implements OnDestroy {
  private fb = inject(NonNullableFormBuilder);
  public readonly store = inject(VocabularyTrackerStore);

  isSpinning = false;
  visible = true;

  tags: string[] = [];
  inputVisible = false;
  inputValue = '';
  @ViewChild('inputElement', { static: false }) inputElement?: ElementRef;


  examples: SentenceExample[] = [];

  partsOfSpeechOptions = [
    { label: 'Noun', value: 'noun' },
    { label: 'Verb', value: 'verb' },
    { label: 'Adjective', value: 'adjective' },
    { label: 'Adverb', value: 'adverb' },
    { label: 'Pronoun', value: 'pronoun' },
    { label: 'Preposition', value: 'preposition' },
    { label: 'Conjunction', value: 'conjunction' },
    { label: 'Interjection', value: 'interjection' },
    { label: 'Phrasal verb', value: 'phrasal verb'}
  ];

  validateForm = this.fb.group({
    word: this.fb.control('', [Validators.required]),
    pronunciation: this.fb.control(''),
    translation: this.fb.control(''),
    meaning: this.fb.control(''),
    level: this.fb.control(''),
    partsOfSpeech: this.fb.control([]),
    ipa: this.fb.control(''),
  });

  askAIForm = this.fb.group({
    word: this.fb.control(''),
  });

  close() {
    this.visible = false
  }

  ngOnDestroy() {
    this.validateForm.reset(); // 🧹 Clear form value
    this.askAIForm.reset(); // 🧹 Clear AI form value
    this.tags = []; // 🧹 Clear tags
    this.examples = []; // 🧹 Clear examples
  }

  submitForm() {
    if (this.validateForm.valid) {
      const request: CreateVocabularyRequest = {
        ...this.validateForm.value,
        word: this.validateForm.value.word || '',
        languageCode: 'en', // Assuming 'en' as default language code, can be changed as needed
        tags: this.tags,
        examples: this.examples.map(example => ({
          sentence: example.sentence,
          pronunciation: example.pronunciation,
          meaning: example.meaning
        }))
      };

      this.store.createVocabulary(request).then(() => {
        this.close();
      });
    } else {
      this.validateForm.markAllAsTouched();
    }
  }

  addSentence(e?: MouseEvent): void {
    e?.preventDefault();

    const id = this.examples.length > 0 ? this.examples[this.examples.length - 1].id + 1 : 1;

    const control = {
      id,
      sentence: '',
      meaning: '',
      pronunciation: '',
    };
    this.examples.push(control);
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
        ipa: data.ipa,
      });

      this.examples = data.examples.map((sentence: any, index: number) => ({
        id: index + 1,
        sentence: sentence.sentence,
        meaning: sentence.meaning,
        pronunciation: sentence.pronunciation
      }));

      this.tags = data.tags || [];
      this.isSpinning = false;

    }
  }

  onAskAi() {
    const word = this.askAIForm.get('word')?.value as string;
    this.generateWord(word)
  }

  removeSentece(id: number) {
    this.examples = this.examples.filter(s => s.id !== id);
  }

  handleClose(removedTag: {}): void {
    this.tags = this.tags.filter(tag => tag !== removedTag);
  }

  sliceTagName(tag: string): string {
    const isLongTag = tag.length > 20;
    return isLongTag ? `${tag.slice(0, 20)}...` : tag;
  }

  showInput(): void {
    this.inputVisible = true;
    setTimeout(() => {
      this.inputElement?.nativeElement.focus();
    }, 10);
  }

  handleInputConfirm(): void {

    if (this.inputValue && this.tags.indexOf(this.inputValue) === -1) {
      this.tags = [...this.tags, this.inputValue];
    }
    this.inputValue = '';
    this.inputVisible = false;
  }
}

