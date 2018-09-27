import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class UserService {

  registerUrl: string = "http://localhost:3000/api/appUsers"
  loginUrl: string = "http://localhost:3000/api/appUsers/login"

  returnUrl: string = 'dashboard'
    failedUrl: string = 'home';
  token = sessionStorage.getItem("token")
  userId = sessionStorage.getItem("userId")

    verifyUrl: string = "http://localhost:3000/api/appUsers/"+this.userId+"/accessTokens?access_token="+this.token;

    constructor(private http : HttpClient, private router: Router) {}

        register(user){
            return this.http.post( this.registerUrl, user)
        }
        login(data) {
            return this.http.post( this.loginUrl, data)

        }
        toHomePage(resData) {
        sessionStorage.setItem("token", resData["token"])
        sessionStorage.setItem("userId", resData["userId"])
           this.router.navigate([this.returnUrl])
        }
        verifyLogin() {
            return this.http.get(this.verifyUrl)
        }
        failedLogin() {
        this.router.navigate([this.failedUrl])
        }
}
