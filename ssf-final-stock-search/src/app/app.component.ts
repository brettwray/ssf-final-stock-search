import { Component, OnInit } from '@angular/core';
import { ApiService} from './services/api.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    date:string = "2018-09-11";
    dates = [
        "2018-09-11",
        "2018-09-10",
        "2018-09-07",
    ];
    time_series = [
        "Time Series (Daily)"
    ];
    perf_indicator = [
        "1. open",
        "2. high",
        "3. low",
        "4. close"
    ]
    performance= [
            ];
    open: string;

    symbol: string ='MSFT'

    constructor(private _api: ApiService) {
        this._api.getData(this.symbol)
            .subscribe((data:any) =>{
                console.log('TESTING',data)
                this.open = data["Time Series (Daily)"][this.date][this.perf_indicator[1]]
                
                    
                for (let i: number = 0; i < this.dates.length; i++) {
                
                            this.performance.push(data["Time Series (Daily)"][this.dates[i]]["1. open"]),
                            this.performance.push(data["Time Series (Daily)"][this.dates[i]]["2. high"]),
                            this.performance.push(data["Time Series (Daily)"][this.dates[i]]["3. low"]),
                            this.performance.push(data["Time Series (Daily)"][this.dates[i]]["4. close"])
                    }
                
                    console.log(this.performance)
            })
    }





}


