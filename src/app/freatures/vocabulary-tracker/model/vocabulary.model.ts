
export class SentenceExample {
  id!: number;
  sentence!: string;
  pronunciation?: string;
  meaning!: string;
}

export class VocabularyModel {
  _id!: string
  languageCode!: string; // ISO code like 'en', 'jp'
  word!: string;
  translation!: string;
  meaning!: string;
  ipa!: string
  pronunciation?: string;
  level?: string;
  partsOfSpeech?: string[];
  tags?: string[];
  examples!: SentenceExample[];
  creationDate?: Date;
  latestReviewDate?: Date;
}