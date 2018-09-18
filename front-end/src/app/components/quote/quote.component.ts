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
export class QuoteComponent implements OnInit, OnChanges {
    _fromDate;
    _toDate;
    datesBetween = []
    dataDates = []
    dateForm = new FormGroup({
        fromDate: new FormControl(''),
        toDate: new FormControl ('')
    });

    _chart:HTMLElement;
    fromDate:string;
    toDate: string;
    dates = [ '2018-09-11', '2018-09-12'
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

    openPrice = {data: [], label: []};
    highPrice = {data: [], label: []};
    lowPrice = {data: [], label: []};
    closePrice = {data: [], label: []};

    public lineChartData:Array<any> = [{data: [], label: []}];

    getDatesBetween(startDate, endDate) {
        let testArray = []
        let beginDate = moment(startDate);
        let endingDate = moment(endDate);
        while (beginDate <= endingDate) {
                this.datesBetween.push(moment(beginDate).format('YYYY-MM-DD'))
                beginDate = moment(beginDate).add(1, 'days');
        }
        console.log('dates',this.dates)
        console.log('dates between', this.datesBetween)
    }
    onSearch() {
        this._fromDate = formatDate(this.dateForm.controls['fromDate'].value,  'yyyy-MM-dd','en')
        this._toDate =  formatDate(this.dateForm.controls['toDate'].value,  'yyyy-MM-dd','en')
        this.getDatesBetween(this._fromDate, this._toDate)
        for (let d = 0; d <= this.datesBetween.length; d++ ) {
            if(this.dataDates.includes(this.datesBetween[d])) {
                this.dates.push(this.datesBetween[d])
            }
        }
        console.log('dates work', this._fromDate, this._toDate)
    }
    constructor(private _api: ApiService) {

//TODO: The dates are added to the labels when Randomize is used. Take the dates between array and run each date through the API call to create a new array that's the exact same
        //ToDo: stucture as the current line chart data array. Then with onSearch() replace the old array with the new array.



        this._api.getData()
            .subscribe(res => {
                //Gets All Dates Available From API Return
                this.dataDates  = []

                for (let i:number =0; i<= this.dates.length; i++) {
                    for (var _dates in res[this.time_series[0]]) {
                        if (res[this.time_series[0]].hasOwnProperty(this.dates[i])){
                            this.dataDates.push(_dates)
                        }
                    }
                    console.log('Test Data Dates',this.dataDates)
                }
                //Adds API data to object for the specific data
                for (let i: number = 0; i < this.dates.length; i++) {
                    this.openPrice.data.push(res[this.time_series[0]][this.dates[i]][this.perf_indicator[0]]);
                    this.highPrice.data.push(res[this.time_series[0]][this.dates[i]][this.perf_indicator[1]]);
                    this.lowPrice.data.push(res[this.time_series[0]][this.dates[i]][this.perf_indicator[2]]);
                    this.closePrice.data.push(res[this.time_series[0]][this.dates[i]][this.perf_indicator[3]]);
                }
                //Initializes the Line Chart Data
                this.lineChartData = [
                    { data: [], label:[]},
                    { data: [], label:[]},
                    { data: [], label:[]},
                    { data: [], label:[]}

                ];
                //Pushes the data from its own object to chart
                for (let p: number = 0; p <= this.openPrice.data.length; p++) {
                    this.lineChartData[0]["data"].push(this.openPrice.data[p]),
                        this.lineChartData[1]["data"].push(this.highPrice.data[p]),
                        this.lineChartData[2]["data"].push(this.lowPrice.data[p]),
                        this.lineChartData[3]["data"].push(this.closePrice.data[p])

                }
                this.lineChartData[0]["label"] = 'Open Price'
                this.lineChartData[1]["label"] = 'High Of Day'
                this.lineChartData[2]["label"] = 'Low of Day'
                this.lineChartData[3]["label"] = 'Closing Price'

            });

    }
    //Draws data when view is initialized
    ngOnInit(){
        this._chart = document.getElementById('stockChart') as HTMLElement;
        this.lineChartData = [
            { data:[this.openPrice.data], label: 'Opening Price'},
            { data: [this.highPrice.data], label: 'High Price'},
            { data: [this.lowPrice.data], label: 'High Price'},
            { data: [this.closePrice.data], label: 'High Price'},
        ]
    }

    // lineChart
    public lineChartLabels:Array<any> = this.dates;
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

    public randomize():void {
        let _lineChartData:Array<any> = new Array(this.lineChartData.length);
        for (let i = 0; i < this.lineChartData.length; i++) {
            _lineChartData[i] = {data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label};
            for (let j = 0; j < this.lineChartData[i].data.length; j++) {
                _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
            }
        }
        this.lineChartData = _lineChartData;
    }

    // events
    public chartClicked(e:any):void {
        console.log(e);
    }

    public chartHovered(e:any):void {
        console.log(e);
    }

ngOnChanges() {

    console.log('testing',this.dates)


}
}



