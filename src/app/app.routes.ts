import { Routes } from '@angular/router';
import { weatherResolver } from './weather/resolver/weather.resolver';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./app.component').then((m) => m.AppComponent),
    pathMatch: 'full',
    resolve: [weatherResolver],
  },
];
