import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { QuoteComponent } from './components/quote/quote.component';
import { LoginComponent } from './components/login/login.component';


export const router: Routes = [
    { path: '', redirectTo: 'app-root', pathMatch: 'full' },
    { path: 'authorized', component: AppComponent },
    { path: 'quote', component: QuoteComponent },
    { path: 'login', component: LoginComponent }
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);