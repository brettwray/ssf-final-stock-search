import { Component, OnInit } from '@angular/core';
import {FavoriteService} from '../../services/favorite.service';
import {ApiService} from '../../services/api.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  data:any;
  isUp = [];
  isDown = [];
  constructor(private fave : FavoriteService, private _api : ApiService) {


  }




  ngOnInit() {
      this.fave.getFavorites()
          .subscribe(res => {
              this.data = res;
              for (let i: number = 0; i < this.data.length; i++) {
                  this._api.getLatest(this.data[i]["ticker"])
                      .subscribe(ret =>{
                          console.log(ret)
                          let Quote = ret["Global Quote"];
                          console.log(Quote["09. change"],'checking quote')
                          if (Math.sign(Quote["09. change"]) != 1) {
                              this.isDown.push(Array.from(Object.values(Quote)))
                          } else {
                              this.isUp.push(Array.from(Object.values(Quote)))
                          }
                      })
              }
          })
console.log('isup', this.isUp, this.isDown,'down')

  }

}
