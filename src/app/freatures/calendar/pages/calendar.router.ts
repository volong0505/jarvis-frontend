import { Route, Routes } from "@angular/router";

export const calendarRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./calendar-month-view/calendar-month-view-component').then(c => c.CalendarMonthViewComponent),
    }]  