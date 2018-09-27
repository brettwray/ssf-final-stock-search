import {Component, OnChanges, OnInit, ViewChild} from '@angular/core';
import {ApiService} from '../../services/api.service';
import { Chart } from 'chart.js'
import {FormControl, FormGroup} from '@angular/forms';
import * as moment from 'moment';
import {formatDate} from '@angular/common';
import { weekdaysShort } from 'moment';
import {FavoriteService} from '../../services/favorite.service';
import {AuthService} from '../../services/auth.service';


@Component({
    selector: 'app-quote',
    templateUrl: './quote.component.html',
    styleUrls: ['./quote.component.css']
})
export class QuoteComponent implements OnInit {
    _fromDate;
    _toDate;
    datesBetween = []
    dataDates = []
    dateForm = new FormGroup({
        stockSymbol: new FormControl(''),
        fromDate: new FormControl(''),
        toDate: new FormControl ('')
    });
    dates = [];
    time_series = [
        'Time Series (Daily)'
    ];
    perf_indicator = [
        '1. open',
        '2. high',
        '3. low',
        '4. close'
    ];
    apiData;
    rawData;
    metaData = [];
    ticker;
    openPrice = {data: [], label: []};
    highPrice = {data: [], label: []};
    lowPrice = {data: [], label: []};
    closePrice = {data: [], label: []};

    public lineChartData:Array<any> = [{data: [], label: []}];
    public lineChartLabels:Array<any> = []
    constructor(private _api: ApiService, private fave : FavoriteService, private auth: AuthService) {}
    callApi(){
        this._api.getData(this.dateForm.controls['stockSymbol'].value)
            .subscribe(res => {
                this.apiData = res["Time Series (Daily)"];
                this.rawData = res;
                this.metaData.push(Array.from(Object.values(res["Meta Data"])))
                console.log('this.metaData', this.metaData)
                //Gets All Dates Available From API Return
                this.dataDates  = [];

                for (let i:number =0; i<= this.datesBetween.length; i++) {
                    for (var _dates in res[this.time_series[0]]) {
                        if (this.rawData["Time Series (Daily)"].hasOwnProperty(this.datesBetween[i])){
                            this.dataDates.push(_dates)
                        }
                    }
                }
            console.log('meta', this.metaData)
            });

            setTimeout(() =>{
                console.log('this ran')

                this.validDates()

            }, 1000)

    }

    //Gets all of the dates between the two dates the user inputs
    getDatesBetween(startDate, endDate) {

        let beginDate = moment(startDate);
        let endingDate = moment(endDate);
        while (beginDate <= endingDate) {
            this.datesBetween.push(moment(beginDate).format('YYYY-MM-DD'))
            beginDate = moment(beginDate).add(1, 'days');
        }
    }
    validDates() {
        let matches = []
        this.datesBetween.forEach((e1)=>this.dataDates.forEach((e2)=>
        {if (e1 === e2){
            matches.push(e1)
            }
        }
        ));
        let d = new Set(matches)
        let f = d.values()
        let r =  Array.from(f)
        this.dates = r;

        this.prepChart()
    }

    prepChart() {
        console.log('dates',this.dates, 'dates between', this.datesBetween, 'data dates', this.dataDates)
        //Adds API data to object for the specific data
        for (let i: number = 0; i < this.dates.length; i++) {
            this.openPrice.data.push(this.apiData[this.dates[i]][this.perf_indicator[0]]/1);
            this.highPrice.data.push(this.apiData[this.dates[i]][this.perf_indicator[1]]/1);
            this.lowPrice.data.push(this.apiData[this.dates[i]][this.perf_indicator[2]]/1);
            this.closePrice.data.push(this.apiData[this.dates[i]][this.perf_indicator[3]]/1);
        }
            for (let i:number = 0; i< this.dates.length; i++) {
            this.lineChartLabels.push(this.dates[i])
        }
        this.buildChart()
    }
    buildChart() {
        this.lineChartData = [
            { data: [], label:[]},
            { data: [], label:[]},
            { data: [], label:[]},
            { data: [], label:[]}

        ];
        this.lineChartData[0]["label"] = 'Open Price'
        this.lineChartData[1]["label"] = 'High Of Day'
        this.lineChartData[2]["label"] = 'Low of Day'
        this.lineChartData[3]["label"] = 'Closing Price'

        for (let p: number = 0; p < this.openPrice.data.length; p++) {
            this.lineChartData[0]["data"].push(this.openPrice.data[p])
            this.lineChartData[1]["data"].push(this.highPrice.data[p]),
            this.lineChartData[2]["data"].push(this.lowPrice.data[p]),
            this.lineChartData[3]["data"].push(this.closePrice.data[p])
        }

        }


    //Performed when the search button is clicked
    onSearch() {

        while (this.lineChartLabels.length > 0) {
            this.lineChartLabels.pop();
            this.lineChartData.pop();
        }
        //Formats the date to the format used on the API
        this._fromDate = formatDate(this.dateForm.controls['fromDate'].value,  'yyyy-MM-dd','en')
        this._toDate =  formatDate(this.dateForm.controls['toDate'].value,  'yyyy-MM-dd','en')
        this.getDatesBetween(this._fromDate, this._toDate)
        for (let d = 0; d <= this.datesBetween.length; d++ ) {
            if(this.dataDates.includes(this.datesBetween[d])) {
                this.dates.push(this.datesBetween[d])
            }

        }
        this.openPrice = {data: [], label: []};
        this.highPrice = {data: [], label: []};
        this.lowPrice = {data: [], label: []};
        this.closePrice = {data: [], label: []};

        //saves symbol input to variable
        this.ticker = this.dateForm.controls['stockSymbol'].value;
        this.fave.getSymbol(this.ticker)
        console.log(this.metaData)
        this.callApi()

        }


    ngOnInit(){

        //Initializes Line Chart Data With No Data so the entire array is overwritten once the dates and symbol are entered
        this.lineChartData = [
            { data: [], label:[]},
            { data: [], label:[]},
            { data: [], label:[]},
            { data: [], label:[]}

        ];
        this.lineChartData[0]["label"] = 'Open Price'
        this.lineChartData[1]["label"] = 'High Of Day'
        this.lineChartData[2]["label"] = 'Low of Day'
        this.lineChartData[3]["label"] = 'Closing Price'

        }
    // CODE BELOW IS USED FOR CHART STYLES
    public lineChartOptions:any = {
        responsive: true


    };
    public lineChartColors:Array<any> = [
        { // grey
            backgroundColor: 'rgba(148,159,177,0.2)',
            borderColor: 'rgba(148,159,177,1)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        },
        { // dark grey
            backgroundColor: 'rgba(77,83,96,0.2)',
            borderColor: 'rgba(77,83,96,1)',
            pointBackgroundColor: 'rgba(77,83,96,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(77,83,96,1)'
        },
        { // grey
            backgroundColor: 'rgba(148,159,177,0.2)',
            borderColor: 'rgba(148,159,177,1)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        }
    ];
    public lineChartLegend:boolean = true;
    public lineChartType:string = 'line';


    // events
    public chartClicked(e:any):void {
        console.log(e);
    }

    public chartHovered(e:any):void {
        console.log(e);
    }

}



