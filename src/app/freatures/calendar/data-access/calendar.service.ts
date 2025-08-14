import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root'},)
export class CalendarService {

    searchEvent(params: any): any {
        // Logic to search for events
        return {} as any
    }   

    createEvent(event: any): any { 
        return {}
    }

    deleteEvent(id: string): any {
        // Logic to delete an event by id
    }   
        // Logic to create an event
    // This service will contain methods to interact with the calendar data
    // For example, methods to fetch events, create, update, or delete events
}   