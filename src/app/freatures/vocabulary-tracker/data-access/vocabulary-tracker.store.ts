import { inject } from '@angular/core';
import { patchState, signalStore, withHooks, withMethods, withState } from '@ngrx/signals';
import { lastValueFrom } from 'rxjs';
import { VocabularyTrackerService } from './vocabulary-tracker.service';
import { VocabularyModel } from '../model/vocabulary.model';
import { HttpErrorResponse } from '@angular/common/http';


export interface VocabularyTrackerModel {
    vocabularyList: VocabularyModel[];
    isLoading: boolean;
    errorMessage: string | null;
    drawerIsOpen: boolean;
}

const initialState: VocabularyTrackerModel = {
    vocabularyList: [],
    isLoading: false,
    errorMessage: null,
    drawerIsOpen: false
}

export const VocabularyTrackerStore = signalStore(
       { providedIn: 'root' },
    withState(initialState),
    withMethods((store, service = inject(VocabularyTrackerService)) => ({
        async loadVocabularyList(params: { keyword: string }) {
            patchState(store, { isLoading: true, errorMessage: null });
            try {
                const res$ = service.getVocabularyList(params);
                const res = await lastValueFrom(res$);
                patchState(store, { vocabularyList: res.data, isLoading: false });
            } catch (error) {
                patchState(store, { isLoading: false, errorMessage: 'Failed to load vocabulary list' });
            }
        },
        async getWordFromAI(word: string) {
            patchState(store, { isLoading: true, errorMessage: null });
            try {
                const res$ = service.getWordFromAI(word);
                const res = await lastValueFrom(res$);
                return res.data;
            } catch (error) {
                const errorMessage = typeof error === 'object' && error !== null && 'message' in error
                    ? String((error as { message?: unknown }).message)
                    : 'Failed to fetch word from AI';
                console.log('Error fetching word from AI:', errorMessage);
                patchState(store, { isLoading: false, errorMessage });
                throw error;
            } finally {
                patchState(store, { isLoading: false });
            }
        },
        async createVocabulary(request: any) {
            patchState(store, { isLoading: true, errorMessage: null });
            try {
                const res$ = service.createVocabulary(request);
                await lastValueFrom(res$);
                const params = {
                    keyword: request.keyword || '',
                };
                this.loadVocabularyList(params); // Reload vocabulary list after creation
                this.closeDrawer();
            } catch (error) {
                patchState(store, { isLoading: false, errorMessage: 'Failed to create vocabulary' });
            } finally {
                patchState(store, { isLoading: false });
            }
        },
        openDrawer() {
            patchState(store, { drawerIsOpen: true })
        },
        closeDrawer() {
            patchState(store, { drawerIsOpen: false })
        },
    })
    ),
    withHooks({
        onInit(store) {
            store.loadVocabularyList({ keyword: '' }); // Load initial vocabulary list
        }
    }
    )
)