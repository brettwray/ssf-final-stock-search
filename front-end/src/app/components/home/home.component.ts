import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import '@clr/icons';
import '@clr/icons/shapes/commerce-shapes'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit():void {
  }

}
