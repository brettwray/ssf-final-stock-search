import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import { is_auth} from './components/dashboard/is-auth.module';
import { not_auth} from './components/home/not-auth.module';

export const router: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent, children:not_auth },
    { path: 'dashboard', component: DashboardComponent, children:is_auth}
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);