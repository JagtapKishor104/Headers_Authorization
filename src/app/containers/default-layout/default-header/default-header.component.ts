import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ClassToggleService, HeaderComponent } from '@coreui/angular';
import { ApiService } from 'src/services/api.service';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent {
  @Input() sidebarId: string = "sidebar";

  public newMessages = new Array(4)
  public newTasks = new Array(5)
  public newNotifications = new Array(5)
  userType: string | null;

  constructor(private classToggler: ClassToggleService,private router:Router,private api:ApiService
    ) {
    super();
    this.userType=this.api.get_user_type();
  }
  logout()
  {
    localStorage.clear();
    if(this.userType=="admin")
    {
      
      this.router.navigate(["/login"])
    }
    else if(this.userType=="supervisor")
    {
      this.router.navigate(["/login"])
    }
  }

  admin_name=localStorage.getItem("admin_name");

emp_name=this.api.get_emp_name();
}
