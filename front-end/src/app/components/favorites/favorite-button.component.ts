import {Component, OnInit} from '@angular/core';
import {FavoriteService} from '../../services/favorite.service';

@Component({
  selector: 'app-favorite-button',
  templateUrl: './favorite-button.component.html',
  styleUrls: ['./favorite-button.component.css']
})
export class FavoriteButtonComponent implements OnInit{

  ticker:string;

  constructor(private fave: FavoriteService ){

  }

  onClick(){
    this.fave.getSymbol(this.ticker)
      this.sendFavorite(this.ticker)
  }
  sendFavorite(ticker){
    console.log('send fave', ticker)
    this.fave.addFavorite(ticker)
        .subscribe(res =>{

        })
}


  ngOnInit(){
      this.fave.currentSymbol.subscribe(symbol => this.ticker = symbol)

  }


}
