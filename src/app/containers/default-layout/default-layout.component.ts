import { Component } from '@angular/core';

import { navItems, navItems2 } from './_nav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
})
export class DefaultLayoutComponent {

  public navItems = navItems;
  public navItems2 = navItems2;
  public nav2:any; 

  public perfectScrollbarConfig = {
    suppressScrollX: true,
  };

  constructor(
   
  ) {
  
   this.nav2 = localStorage.getItem("user_type");
  }
}
