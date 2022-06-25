import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { IconSetService } from '@coreui/icons-angular';
import { iconSubset } from './icons/icon-subset';
import { Title } from '@angular/platform-browser';
import { ApiService } from 'src/services/api.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'body',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {
  title = 'Angular Admin Panel';

  constructor(
    private router: Router,
    private titleService: Title,
    private iconSetService: IconSetService,
    private api: ApiService,

  ) {
    titleService.setTitle(this.title);
    // iconSet singleton
    iconSetService.icons = { ...iconSubset };
    this.get_city();
    // this.get_attendence();
    this.get_emp_name();
    this.get_emp_type();
  }

  ngOnInit(): void {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
    });
  }



  public get_city() {
    this.api.get("Cities").subscribe({
      next: (res: any) => {
        this.api.cities = res.Data;
        console.log("city in .ts",this.api.cities);
      }
    })
  }

  public get_emp_name() {
    this.api.get("Employees").subscribe({
      next: (res: any) => {
        this.api.emp_name = res.data;
        console.log("Emp Name in .ts",this.api.emp_name);
      }
    })
  }

  get_emp_type()
  {
    this.api.get("Employee_Type").subscribe({
      next:(res:any)=>
      {
        this.api.emp_type=res.data;
        console.log(" emp type",this.api.emp_type);
        
      }
    })
  }

}
