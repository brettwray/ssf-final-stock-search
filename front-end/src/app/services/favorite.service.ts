import { Injectable } from '@angular/core';
import {UserService} from './user.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  userId = sessionStorage.getItem("userId")
  constructor(private http:HttpClient) {

  }

}
