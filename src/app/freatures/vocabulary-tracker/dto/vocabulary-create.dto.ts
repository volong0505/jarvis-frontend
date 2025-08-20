
class ExampleDto {
  sentence!: string;
  pronunciation?: string;
  meaning?: string;
}


export class CreateVocabularyRequest {
  languageCode!: string;
  word!: string;
  translation?: string;
  pronunciation?: string;
  meaning?: string;
  ipa?: string;
  level?: string;
  partsOfSpeech?: string[];
  tags?: string[];
  examples!: ExampleDto[];
}
