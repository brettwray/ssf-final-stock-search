import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {formatDate} from '@angular/common';
import * as moment from 'moment';
import {DatePusherService} from '../../services/date-pusher.service';
import { Subscription } from 'rxjs'


@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css']
})
export class DatePickerComponent {
    p1: {} = {
        from: {},
        to: {}
    }
    subscription: Subscription;
    _fromDate;
    _toDate;
    datesBetween = []
    dateForm = new FormGroup({
        fromDate: new FormControl(''),
        toDate: new FormControl ('')
    });


    getDatesBetween(startDate, endDate) {
        let testArray = []
        let beginDate = moment(startDate);
    let endingDate = moment(endDate);
    while (beginDate <= endingDate) {
        this.datesBetween.push(moment(beginDate).format('YYYY-MM-DD'))
        beginDate = moment(beginDate).add(1,'days');
    }

        console.log(this.datesBetween)
    }

    onSearch() {
      this._fromDate = formatDate(this.dateForm.controls['fromDate'].value,  'yyyy-MM-dd','en')
      this._toDate =  formatDate(this.dateForm.controls['toDate'].value,  'yyyy-MM-dd','en')
        this.getDatesBetween(this._fromDate, this._toDate)
        console.log('dates work', this._fromDate, this._toDate)
    }
    constructor(private datePusher: DatePusherService) {
        this.subscription = datePusher.$fromDate.subscribe( Dates => {

            })

       }
    sendDates() {
        this.p1['from'] = this._fromDate.toString()
        this.p1['to'] = this._toDate.toString()
        this.datePusher.sendDates(this.p1)

    }

}


