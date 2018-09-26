import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import {FormControl, FormGroup} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {ApiService} from '../../../services/api.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  user:any =
{
    "firstName":'',
    "lastName": '',
    "emailAddress": '',
    "password": ''
}

    resData:any={};
  userRegistration = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl('')

  });



  constructor(private _user : UserService) { }

  onSubmit() {
      this.user.firstName = this.userRegistration.controls["firstName"].value
      this.user.lastName = this.userRegistration.controls["lastName"].value
      this.user.email = this.userRegistration.controls["email"].value
      this.user.password = this.userRegistration.controls["password"].value

    }
  onRegister() {
    console.log()
    this._user.register(this.userRegistration.value)
        .subscribe(res => {
            this._user.toHomePage(this.resData)
            {
                sessionStorage.setItem('token', res["token"])
                sessionStorage.setItem('userId', res["userId"])
            }
        })
  }

  ngOnInit() {
  }


}
