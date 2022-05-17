import { Component, OnInit } from '@angular/core';
import {ApiService} from "./Services/api.service";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  Data: any;

  constructor(
    private api:ApiService
  ){}

  ngOnInit(): void {
    this.getAllstore();
  }

getAllstore()

{
  this.api.getstore().subscribe({next:(res)=>
  {
    this.Data=res.data;
    console.log(this.Data);
    
  }})
}


  title = 'MoveMyCart';
}
