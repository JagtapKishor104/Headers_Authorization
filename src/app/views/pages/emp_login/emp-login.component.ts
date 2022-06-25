import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from "@angular/forms";
import { ApiService } from "../../../../services/api.service";
import { Router } from "@angular/router";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-emp-login',
  templateUrl: './emp-login.component.html',
  styleUrls: ['./emp-login.component.scss']
})
export class EmpLoginComponent implements OnInit {

  constructor(private fb: FormBuilder, private api: ApiService, private router: Router
  ) { }

  ngOnInit(): void {
  }

  empform = this.fb.group({
    mobile: new FormControl(""),
    emp_password: new FormControl("")
  });

  empSubmit() {
    let info = this.empform.value;
    const param = {
      mobile: info.mobile,
      emp_password: info.emp_password
    }
    console.log("Empform Param", param);
    this.api.post("Employees/login", param).then((res: any) => {
      console.log(res);
      if (res.message == 'Success') {
        localStorage.setItem("emp_id", res.data.emp_id);
        localStorage.setItem("user_type", "emp");
        localStorage.setItem("first_name", res.data.first_name)
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
  
        })
  
        Toast.fire({
          icon: 'success',
          title: 'Login Successfull'
        });
     
        this.router.navigate(["/employee"]);

      }
      else if(res.message=='Error') {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
  
        })
  
        Toast.fire({
          icon: 'error',
          title: 'Login Failed'
        });
        this.router.navigate(["/emp_login"])
      }
    }); 

  }
}
