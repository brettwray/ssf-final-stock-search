import { Injectable } from '@angular/core';
import {UserService} from './user.service';
import {Router} from '@angular/router';


@Injectable({
    providedIn: 'root'
})
export class AuthService {


    constructor(private user: UserService, private route: Router) {



    }
    isAuth(){
            this.user.verifyLogin()
            .subscribe(res =>
              {

                })

    }
}
