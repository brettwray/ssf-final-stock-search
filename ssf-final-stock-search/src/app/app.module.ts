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



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    QuoteComponent,
    LoginComponent,
    HomeComponent,
    
  ],
  imports: [
    BrowserModule, HttpClientModule, ChartsModule, BrowserAnimationsModule, ClarityModule, ClrFormsNextModule, routes
  ],
  providers: [ ApiService, UserService  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
