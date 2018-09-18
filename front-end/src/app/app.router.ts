import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { QuoteComponent } from './components/quote/quote.component';

import {RegistrationComponent} from './components/login/registration/registration.component';


export const router: Routes = [
    { path: 'home', redirectTo: 'app-root', pathMatch: 'full' },
    { path: 'authorized', component: AppComponent },
    { path: 'quote', component: QuoteComponent },
    { path: '', component: RegistrationComponent }
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);