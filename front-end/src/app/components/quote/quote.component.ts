import {Component, OnChanges, OnInit, ViewChild} from '@angular/core';
import {ApiService} from '../../services/api.service';
import { Chart } from 'chart.js'
import {FormControl, FormGroup} from '@angular/forms';
import * as moment from 'moment';
import {formatDate} from '@angular/common';


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
    metaData;
    openPrice = {data: [], label: []};
    highPrice = {data: [], label: []};
    lowPrice = {data: [], label: []};
    closePrice = {data: [], label: []};

    public lineChartData:Array<any> = [{data: [], label: []}];

    constructor(private _api: ApiService) {}
    callApi(){
        this._api.getData(this.dateForm.controls['stockSymbol'].value)
            .subscribe(res => {

                this.apiData = res["Time Series (Daily)"];
                this.rawData = res;
                this.metaData = res["Meta Data"]
                //Gets All Dates Available From API Return
                this.dataDates  = [];

                for (let i:number =0; i<= this.datesBetween.length; i++) {
                    for (var _dates in res[this.time_series[0]]) {
                        if (this.rawData.hasOwnProperty(this.datesBetween[i])){
                            this.dataDates.push(_dates)
                        }
                    }
                }

            });

            setTimeout(() =>{
                console.log('this ran')
                this.prepChart()

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

    prepChart() {

        //Initializes the Line Chart Data

        //Adds API data to object for the specific data
        for (let i: number = 0; i < this.datesBetween.length; i++) {
            this.openPrice.data.push(this.apiData[this.datesBetween[i]][this.perf_indicator[0]]);
            this.highPrice.data.push(this.apiData[this.datesBetween[i]][this.perf_indicator[1]]);
            this.lowPrice.data.push(this.apiData[this.datesBetween[i]][this.perf_indicator[2]]);
            this.closePrice.data.push(this.apiData[this.datesBetween[i]][this.perf_indicator[3]]);

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
        for (let p: number = 0; p < this.openPrice.data.length; p++) {
            this.lineChartData[0]["data"].push(this.openPrice.data[p])
            this.lineChartData[1]["data"].push(this.highPrice.data[p]),
            this.lineChartData[2]["data"].push(this.lowPrice.data[p]),
            this.lineChartData[3]["data"].push(this.closePrice.data[p])
        }

        this.lineChartData[0]["label"] = 'Open Price'
        this.lineChartData[1]["label"] = 'High Of Day'
        this.lineChartData[2]["label"] = 'Low of Day'
        this.lineChartData[3]["label"] = 'Closing Price'
        }


    //Performed when the search button is clicked
    onSearch() {

        //Formats the date to the format used on the API
        this._fromDate = formatDate(this.dateForm.controls['fromDate'].value,  'yyyy-MM-dd','en')
        this._toDate =  formatDate(this.dateForm.controls['toDate'].value,  'yyyy-MM-dd','en')
        this.getDatesBetween(this._fromDate, this._toDate)
        for (let d = 0; d <= this.datesBetween.length; d++ ) {
            if(this.dataDates.includes(this.datesBetween[d])) {
                this.dates.push(this.datesBetween[d])
            }

        }
        this.callApi()
        if (this.apiData) {
            console.log('Has Data', this.apiData)
        } else {
            console.log('No Data')
        }

        }


    ngOnInit(){
        //Initializes Line Chart Data With No Data so the entire array is overwritten once the dates and symbol are entered
        this.lineChartData = [
            { data: [], label:[]},
            { data: [], label:[]},
            { data: [], label:[]},
            { data: [], label:[]}

        ];
        if (this.apiData == true) {
            console.log('Has Data', this.apiData)
        } else {
            console.log('No Data')
        }
    }
    // CODE BELOW IS USED FOR CHART STYLES
    // lineChart
    public lineChartLabels:Array<any> = this.datesBetween;
    //public lineChartData:Array<any> = [{data: [2,4,5], label: 'open'}];
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
    //RANDOMIZE THE CHART
    // public randomize():void {
    //     let _lineChartData:Array<any> = new Array(this.lineChartData.length);
    //     for (let i = 0; i < this.lineChartData.length; i++) {
    //         _lineChartData[i] = {data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label};
    //         for (let j = 0; j < this.lineChartData[i].data.length; j++) {
    //             _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
    //         }
    //     }
    //     this.lineChartData = _lineChartData;
    // }

    // events
    public chartClicked(e:any):void {
        console.log(e);
    }

    public chartHovered(e:any):void {
        console.log(e);
    }

}



