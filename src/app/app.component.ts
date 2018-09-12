import { Component, OnInit } from '@angular/core';
import { ApiService} from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    date: string = "2018-04-20";
    performance= [];
    symbol: string ='MSFT'

    constructor(private _api: ApiService) {
        this._api.getData(this.symbol)
            .subscribe((data:any) =>{
                    this.performance.push(data["Time Series (Daily)"][this.date]["1. open"]),
                    this.performance.push(data["Time Series (Daily)"][this.date]["2. high"]),
                    this.performance.push(data["Time Series (Daily)"][this.date]["3. low"]),
                    this.performance.push(data["Time Series (Daily)"][this.date]["4. close"])
            })
    }

    ngOnInit() {

    }

}


