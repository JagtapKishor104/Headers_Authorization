import { Component } from '@angular/core';
import { FormBuilder, FormControl } from "@angular/forms";
import { ApiService } from 'src/services/api.service';
import { Router } from "@angular/router";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router
  ) { }

  myform = this.fb.group(
    {
      mobile: new FormControl("8007737743"),

      //supervisor=9172117801
      //admin=9172117802
      password: new FormControl("123456")
    }
  );

  formSubmit() {
    let info = this.myform.value;
    const param = {
      "mobile": info.mobile,
      "password": info.password,
    };
    console.log(param);

    this.api.post("Admin/login", param).then((res: any) => {
      console.log(res);
      if (res.message == "success") {
        localStorage.setItem("Agency_id",res.data[0].agency_id)
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

        if(res.data[0].type==="2")
        {
          localStorage.setItem("user_type","supervisor");
          localStorage.setItem("Name",res.data[0].name);
          localStorage.setItem("supervisor_id",res.data[0].id);
          this.router.navigate(["/company"]);
        }
        else if(res.data[0].type==="1")
        {
          localStorage.setItem("user_type","admin");
          this.router.navigate(["/company"]);
        }
      }
      else {
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
        this.router.navigate(["/login"]);
      }




    })


  }


}
