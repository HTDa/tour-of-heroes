import { Routes } from '@angular/router';
import { HeroesListComponent } from './heroes/heroes-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailsComponent } from './heroes/hero-details.component';

export const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

    { path: 'heroes', component: HeroesListComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'detail/:id', component: HeroDetailsComponent }, 

    { path: '**', redirectTo: 'dashboard' },
];
