import { Component, OnInit } from '@angular/core';
import { ApiService} from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    date:;
    test: string
    constructor(private _api: ApiService) {
    }

    ngOnInit() {
        this._api.getData()
            .subscribe((data: any) =>{
                this.date = data["Time Series (Daily)"]["2018-04-20"]


            })

    }
}

