import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes} from '@angular/router';
import {QuoteComponent} from '../quote/quote.component';

export const is_auth: Routes = [
    { path: '', redirectTo:'quote', pathMatch:'full'},
    { path:'quote', component: QuoteComponent}
]
