import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  resData: any = {};
  data: any =
      {
        "email":'',
        "password":''
      }

        login = new FormGroup( {
          email: new FormControl(''),
          password: new FormControl('')
      });
  constructor(private _user : UserService) { }

    onSubmit() {
        this.data.email = this.login.controls["email"].value
        this.data.password = this.login.controls["password"].value


    }
    onLogin() {

    this._user.login(this.login.value)
        .subscribe(res => {
          this.resData = res;
          this._user.toHomePage(this.resData)
            console.log(this.resData, 'resdata', res, 'res')
        })

    }

  ngOnInit() {
  }

}
