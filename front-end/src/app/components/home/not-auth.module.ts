import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes} from '@angular/router';
import {LoginComponent} from '../login/login.component';

export const not_auth: Routes = [
    { path: '', redirectTo:'login', pathMatch:'full'},
    { path:'login', component: LoginComponent}
]