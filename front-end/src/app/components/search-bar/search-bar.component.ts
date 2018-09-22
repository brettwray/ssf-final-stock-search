import {Component, OnInit} from '@angular/core';
import { ApiService} from '../../services/api.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

    constructor(private _api: ApiService) {
    }

    stockSearch: string = ''

    ngOnInit() {
      this._api.currentSymbol.subscribe(symbol =>console.log(symbol))

    }

    onSearch() {
        this._api.changeSymbol(this.stockSearch)

        console.log('source2', this._api.currentSymbol)
    }
}
