
export class Example {
  sentence!: string;
  pronunciation?: string;
  meaning!: string;
}

export class RelatedWords {
  word!: string;
  translation!: string;
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
  partsOfSpeech?: string;
  category?: string;
  relatedWords!: RelatedWords[]
  examples!: Example[];
  creationDate?: Date;
  latestReviewDate?: Date;
}