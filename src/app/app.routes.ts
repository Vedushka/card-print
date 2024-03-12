import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: "",
        loadComponent: () => import('./generate-page/generate-page.component').then( m => m.GeneratePageComponent)
    }
];
