import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-slip',
  templateUrl: './slip.component.html',
  styleUrls: ['./slip.component.scss']
})
export class SlipComponent implements OnInit {
  sub: any;

  constructor(
    private route:ActivatedRoute
  ) { 

   
    
  }
  slip:{emp_code:any } | any;
  

  ngOnInit(): void {
    
   this.slip={
     id:this.route.snapshot.params["emp_code"],
     emp_name:this.route.snapshot.paramMap.get("name"),
     emp_salary_month:this.route.snapshot.params["salary_month"],
   };
   console.log("slip id",this.slip);
   


  }

 
  
  
  }


