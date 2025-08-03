import { HttpClient, HttpParams } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CreateVocabularyRequest } from "../dto";
import { CreateResponseDto } from "../../../_shared";
import { VocabularyModel } from "../model/vocabulary.model";
@Injectable(  { providedIn: 'root' },)
export class VocabularyTrackerService {

    private readonly http = inject(HttpClient);

    getWordFromAI(word: string): Observable<any> {
        const params = new HttpParams().set('word', word);
        return this.http.get('vocabulary-tracker/generate-word', {params})
  }

    // Example method to fetch vocabulary list
    getVocabularyList(dto: { languageCode: string }): Observable<any> {
         const params = new HttpParams()
      .set('languageCode', dto.languageCode)

        return this.http.get('vocabulary-tracker/vocabulary-list', {params: params})
    }

    // Example method to add a new word
    addWord(dto: CreateVocabularyRequest): Observable<CreateResponseDto<VocabularyModel>> {
        return this.http.post<CreateResponseDto<VocabularyModel>>('vocabulary-tracker/create-vocabulary', {params: dto})
        // Logic to add a new word to the vocabulary list
    }
}