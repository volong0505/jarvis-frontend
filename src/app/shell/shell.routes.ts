import { Route } from "@angular/router";
import { LayoutComponent } from "./ui/layout/layout-component";

export const appShellRoutes: Route[] = [
    { 
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: 'vocabulary-tracker',
                loadComponent: () => import('../freatures/vocabulary-tracker').then( c => c.VocabularyListComponent)
            }
        ]
    }
]