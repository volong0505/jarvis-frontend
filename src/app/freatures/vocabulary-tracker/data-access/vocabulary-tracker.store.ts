import { inject } from '@angular/core';
import { patchState, signalStore, withHooks, withMethods, withState } from '@ngrx/signals';
import { lastValueFrom } from 'rxjs';
import { VocabularyTrackerService } from './vocabulary-tracker.service';
import { VocabularyModel } from '../model/vocabulary.model';


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
        async loadVocabularyList(languageCode: string) {
            patchState(store, { isLoading: true, errorMessage: null });
            try {
                const res$ = service.getVocabularyList({ languageCode })
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
                patchState(store, { isLoading: false, errorMessage: 'Failed to fetch word details' });
                throw error;
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
            store.loadVocabularyList('en')
        }
    }
    )
)