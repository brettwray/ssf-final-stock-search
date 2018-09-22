import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ApiService } from './services/api.service';
import { AppComponent } from './app.component';
import { HeaderComponent } from './navigation/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { QuoteComponent } from './components/quote/quote.component';
import { ChartsModule } from 'ng2-charts';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ClarityModule, ClrFormsNextModule } from "@clr/angular";
import { LoginComponent } from './components/login/login.component';
import { UserService } from './services/user.service';
import { routes } from './app.router';
import { HomeComponent } from './components/home/home.component';
import { ChartsService} from './services/charts.service';
import { DatePickerComponent } from './components/date-picker/date-picker.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {DatePusherService} from './services/date-pusher.service';
import { RegistrationComponent } from './components/login/registration/registration.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    QuoteComponent,
    LoginComponent,
    HomeComponent,
    DatePickerComponent,
    RegistrationComponent,
    SearchBarComponent,

    
  ],
  imports: [
    BrowserModule, HttpClientModule, ChartsModule, BrowserAnimationsModule, ClarityModule, ClrFormsNextModule, routes, FormsModule, ReactiveFormsModule
  ],
  providers: [ ApiService, UserService, ChartsService, DatePusherService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
