import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes} from '@angular/router';
import {LoginComponent} from '../login/login.component';
import {RegistrationComponent} from '../login/registration/registration.component';

export const not_auth: Routes = [
    { path: '', redirectTo:'login', pathMatch:'full'},
    { path:'login', component: LoginComponent},
    { path:'register', component: RegistrationComponent}
]