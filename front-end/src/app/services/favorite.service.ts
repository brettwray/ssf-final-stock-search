import { Injectable } from '@angular/core';
import {UserService} from './user.service';
import {HttpClient} from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
    userId = sessionStorage.getItem("userId");
    token = sessionStorage.getItem("token")
    baseUrl = "http://localhost:3000/api/appUsers/"

    private symbolSource = new BehaviorSubject('')
    currentSymbol = this.symbolSource.asObservable();



    constructor(private http:HttpClient) {}

  getSymbol(symbol: string){
        this.symbolSource.next(symbol)

  }
  addFavorite(ticker) {

        return this.http.post(this.baseUrl+this.userId+"/favorites?access_token="+this.token,{"ticker":ticker})
  }
  removeFavorite() {

  }
      getFavorites() {
        return this.http.get(this.baseUrl+this.userId+"/favorites?access_token="+this.token)
}
}
