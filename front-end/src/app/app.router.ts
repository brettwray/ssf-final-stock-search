import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { QuoteComponent } from './components/quote/quote.component';
import { LoginComponent } from './components/login/login.component'
import {RegistrationComponent} from './components/login/registration/registration.component';


export const router: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'quote', component: QuoteComponent },
    { path: 'register', component: RegistrationComponent }
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);