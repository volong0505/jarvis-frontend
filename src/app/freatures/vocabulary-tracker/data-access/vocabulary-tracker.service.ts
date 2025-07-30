import { HttpClient, HttpParams } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class VocabularyTrackerService {

    private readonly http = inject(HttpClient);

    getWordFromAI(word: string): Observable<any> {
        const params = new HttpParams().set('word', word);
        return this.http.get('vocabulary-tracker/generate-word', {params})
  }

    // Example method to fetch vocabulary list
    getVocabularyList() {
        // Logic to fetch vocabulary list from the server
        return [];
    }

    // Example method to add a new word
    addWord(word: string) {
        // Logic to add a new word to the vocabulary list
    }
}