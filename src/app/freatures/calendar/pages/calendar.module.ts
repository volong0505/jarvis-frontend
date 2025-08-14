import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { calendarRoutes } from "./calendar.router";

@NgModule({
    imports: [
        RouterModule.forChild(calendarRoutes)
    ],
    declarations: [],
    exports: [],
    providers: [
    ],
    bootstrap: []})
export class CalendarModule {
    // This module can be used to encapsulate calendar-related components, services, and other features.
}