import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  BaseUrl: string = 'https://www.alphavantage.co/query?function=';
  apiKey: string ='&apikey=TWXDHYMSVVSHXGI1'
  apiTimePeriod = 'Time_Series_Daily'

  latestUrl:string = 'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol='

  getData(symbol) {
      return this.http.get(this.BaseUrl + this.apiTimePeriod + '&symbol=' + symbol + this.apiKey);

  }
  getLatest(symbol) {
      return this.http.get(this.latestUrl+symbol+this.apiKey)
  }
  }
