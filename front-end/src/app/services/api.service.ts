import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

    dates = [
        '2018-09-11',
        '2018-09-10',
        '2018-09-07',
    ];
    time_series = [
        'Time Series (Daily)'
    ];
    perf_indicator = [
        '1. open',
        '2. high',
        '3. low',
        '4. close'
    ];

  constructor(private http: HttpClient) { }

  BaseUrl: string = 'https://www.alphavantage.co/query?function=';
  apiKey: string ='&apikey=TWXDHYMSVVSHXGI1'
  apiTimePeriod = 'Time_Series_Daily'

  getData(symbol) {
      return this.http.get(this.BaseUrl + this.apiTimePeriod + '&symbol=' + symbol + this.apiKey);

  }
  }
