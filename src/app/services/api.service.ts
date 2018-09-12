import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  constructor(private http: HttpClient) { }

  Baseurl: string = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=MSFT&apikey=';
  symbol: string;
  apiFunction: string ='TIME_SERIES_DAILY'
  apiKey: string ='&apikey=TWXDHYMSVVSHXGI1'

  getData(symbol){
      return this.http.get(this.Baseurl+'?function='+this.apiFunction+'&symbol='+symbol+this.apiKey);
  }

}
