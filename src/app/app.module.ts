import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ApiService } from './services/api.service';
import { AppComponent } from './app.component';
import { HeaderComponent } from './navigation/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { QuoteComponent } from './components/quote/quote.component';
import { ChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    QuoteComponent,
  ],
  imports: [
    BrowserModule, HttpClientModule, ChartsModule
  ],
  providers: [ ApiService,  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
