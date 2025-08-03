import { VocabularyModel } from "../model/vocabulary.model";

export class FindAllByLanguageRequest {
    languageCode!: string;
}

export class FindAllByLanguageResponse {
    data!: VocabularyModel[]
}