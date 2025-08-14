import { HttpClient, HttpParams } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CreateVocabularyRequest } from "../dto";
import { ApiRoutesConstants, CreateResponseDto } from "../../../_shared";
import { VocabularyModel } from "../model/vocabulary.model";

const apiRoutes = ApiRoutesConstants.vocabularyTracker;
@Injectable(  { providedIn: 'root' },)
export class VocabularyTrackerService {

    private readonly http = inject(HttpClient);

    getWordFromAI(word: string): Observable<any> {
        const params = new HttpParams().set('word', word);
        return this.http.get(apiRoutes.generateWord, {params})
  }

    // Example method to fetch vocabulary list
    getVocabularyList(dto: { keyword: string }): Observable<any> {
         const params = new HttpParams()
      .set('keyword', dto.keyword)

        return this.http.get(apiRoutes.search, {params: params})
    }

    // Example method to add a new word
    createVocabulary(dto: CreateVocabularyRequest): Observable<CreateResponseDto<VocabularyModel>> {
        return this.http.post<CreateResponseDto<VocabularyModel>>(apiRoutes.create, dto)
        // Logic to add a new word to the vocabulary list
    }
}