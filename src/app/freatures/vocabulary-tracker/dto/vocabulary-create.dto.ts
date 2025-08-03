
class ExampleDto {
  sentence!: string;
  pronunciation?: string;
  meaning?: string;
}

class RelatedWordsDto {
  word!: string;
  translation?: string;
}

export class CreateVocabularyRequest {
  languageCode!: string;
  word!: string;
  translation!: string;
  pronunciation?: string;
  meaning?: string;
  ipa?: string;
  level?: string;
  partsOfSpeech?: string;
  category?: string;
  examples!: ExampleDto[];
  relatedWords!: RelatedWordsDto[];
}
