import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatePusherService {

  private fromDate = new Subject<any>();
  private toDate = new Subject<any>();

  $fromDate = this.fromDate.asObservable()
  $toDate = this.toDate.asObservable()

  constructor() { }

  getDates(dates: {}) {
    this.fromDate.next(dates)

  }

  sendDates(Dates: {}){
    this.toDate.next(Dates)
  }
}
