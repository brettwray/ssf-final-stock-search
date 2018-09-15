import {Component, OnInit} from '@angular/core';
import {ApiService} from './services/api.service';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
//     date: string = '2018-09-11';
//     dates = [
//         '2018-09-11',
//         '2018-09-10',
//         '2018-09-07',
//     ];
//     time_series = [
//         'Time Series (Daily)'
//     ];
//     perf_indicator = [
//         '1. open',
//         '2. high',
//         '3. low',
//         '4. close'
//     ];
//     performance = [];
//     testing = {data: [], label: []};
//     chartData: any;
//     symbol: string = 'MSFT';
//
//     constructor(private _api: ApiService) {
//         this._api.getData(this.symbol)
//             .subscribe((data: any) => {
//
//
//                 for (let i: number = 0; i < this.dates.length; i++) {
//                     this.testing.data.push(data[this.time_series[0]][this.dates[i]]['1. open']),
//                         this.testing.label.push(this.dates[i]);
//                     // this.performance.push(data["Time Series (Daily)"][this.dates[i]]["2. high"]),
//                     // this.performance.push(data["Time Series (Daily)"][this.dates[i]]["3. low"]),
//                     // this.performance.push(data["Time Series (Daily)"][this.dates[i]]["4. close"])
//
//                 }
//
//
//             });
//
//     }
//
//
// }
}

