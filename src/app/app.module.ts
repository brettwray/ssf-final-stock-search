import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ApiService } from './services/api.service';
import { AppComponent } from './app.component';
import { HeaderComponent } from './navigation/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { QuoteComponent } from './components/quote/quote.component';
import { ChartsModule } from 'ng2-charts';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ClarityModule } from "@clr/angular";


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    QuoteComponent,
  ],
  imports: [
    BrowserModule, HttpClientModule, ChartsModule, BrowserAnimationsModule, ClarityModule
  ],
  providers: [ ApiService,  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
