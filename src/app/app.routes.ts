import { Routes } from '@angular/router';
import { weatherResolver } from './weather.resolver';

export const routes: Routes = [
  { path: '', redirectTo: '/weather', pathMatch: 'full' },
  {
    path: 'weather',
    loadComponent: () => import('./app.component').then((m) => m.AppComponent),
    resolve: [weatherResolver],
  },
];
