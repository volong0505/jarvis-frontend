import { computed, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { lastValueFrom } from 'rxjs';
import { CalendarService } from './calendar.service';


export interface EventStateModel {
    events: any;

    isLoading: boolean;
    isSaving: boolean;
    detailVisible:  boolean;

    currentDate: Date;
    errorMessage: string | null;
    selectId: string | null;
    eventObj: any | null
}

const initialState: EventStateModel = {
    events: [],
    isLoading: false,
    isSaving: false,
    detailVisible: false,

    errorMessage: null,
    currentDate: new Date(),
    selectId: null,
    eventObj: null
}

export const CalendarStore = signalStore(
    { providedIn: 'root'},
    withState(initialState),
    withMethods((store, service = inject(CalendarService)) => ({
        async loadEvents(params: any) {
            patchState(store, { isLoading: true});
            try {
                const events$ = service.searchEvent(params);
                const events = await lastValueFrom(events$);
                // patchState(store, { events: events.data, isLoading: false});
            } catch (e)  {
                patchState(store, { errorMessage:  (e as Error).message, isLoading: false})
            }
        },

        async upsert(event: any) {
            patchState(store, { isSaving: true});
        
            try {
                const data = service.createEvent(event)
                await lastValueFrom(data);
                // patchState(store, { events: store.events().filter(e => e._id != event._id)});
                this.selectEvent(null);
                this.loadEvents(null);
                patchState(store, { isSaving: false, detailVisible: false});

                // console.log(store.detailVisible())
            } catch (e) {
                // patchState(store, { isSaving: false});
            }                
        },

        async delete(id: string) {
            try {

                const data = service.deleteEvent(id);
                await lastValueFrom(data);
                this.selectEvent(null);
                this.loadEvents(null);
            }  catch (e) {
                // patchState(store)
            }
        },

        selectEvent(id?: string | null) {
                // patchState(store, {selectId: id || null,  eventObj: store.events().find(e => e._id === id) || null });
        },

        selectDate(date: Date) {
            patchState(store, { currentDate: date})
        },

        // closeDetailPopup() {
        //     patchState(store, { detailVisible: false})
        // },
    })),
    withComputed((store) => ({
        // selectedEvent: computed(() => {
        //     const id = store.selectId();
        //     return id ? store.events().find(e => e._id === id) || null : null;
        // })
    })),
    withHooks({
        onInit(store) {
            // store.loadEvents(null)
            // store.selectEvent(null)
        }
    })
)



