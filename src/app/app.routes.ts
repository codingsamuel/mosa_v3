import { Routes } from '@angular/router';
import { HomePage } from './pages/home/home.page';
import { Type } from '@angular/core';

export const routes: Routes = [
    {
        path: '',
        loadComponent: (): Promise<Type<HomePage>> => import('./pages/home/home.page').then((m: { HomePage: Type<HomePage> }) => m.HomePage),
    },
    {
        path: '**',
        redirectTo: ''
    }
];
