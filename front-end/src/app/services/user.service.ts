import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class UserService {

  url: string = "http://localhost:3000/api/appUsers"
    constructor(private http : HttpClient) {}

        register(user){
            console.log(user)
            return this.http.post( this.url, user)
        }
    }
