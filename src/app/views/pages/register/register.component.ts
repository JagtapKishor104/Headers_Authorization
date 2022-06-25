import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from "@angular/forms";
import { Router } from '@angular/router';
import { ApiService } from 'src/services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  city: any;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router
  ) {

    if (this.api.cities) {
      this.city = this.api.cities;
    } else {
      this.get_city();
    }
  }


  ngOnInit(): void {
  }


  register_form = this.fb.group(
    {
      name: new FormControl("akhil"),
      email: new FormControl("akhil@example.com"),
      mobile: new FormControl("8007737732"),
      password: new FormControl("123456"),
      type: new FormControl("1"),
      city_id: new FormControl(" "),
      address: new FormControl(""),
      status: new FormControl("1"),
      mobile_number: new FormControl(""),
      contact_person_name: new FormControl(""),


    }
  );

  createAgency() {
    let info = this.register_form.value;
    const param = {
      name: info.name,
      mobile_number: info.mobile_number,
      contact_person_name: info.contact_person_name,
      status: info.status,
    }
    console.log("agency param", param);

    this.api.post("Agency/create", param).then((res: any) => {
      console.log(res);
      if (res.message == 'success') {
        const agency_id = res.data[0].agency_id;
        console.log("agency id", agency_id);
        this.formsubmit(agency_id)
      }
      else {
        alert("Something Wrong")
      }

      // this.formsubmit(res.data.agency_id);
    });
  }


  formsubmit(agency_id: any) {

    let info = this.register_form.value;
    const param = {
      name: info.name,
      email: info.email,
      mobile: info.mobile,
      type: info.type,
      city_id: info.city_id,
      address: info.address,
      status: info.status,
      password: info.password,
      agency_id: agency_id
    }
    console.log("formsubmit", param);

    this.api.post("Admin/create_admin", param).then((res: any) => {
      console.log(res);
      if (res.data == "Mobile Already Registered") {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        })
        Toast.fire({
          icon: 'warning',
          title: 'Already mobile register'
        });
      }
      else if (res.message == "success") {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        })
        Toast.fire({
          icon: 'success',
          title: 'Registration Successfull  '
        });

        if (res.data[0].type === "2") {
          localStorage.setItem("user_type", "supervisor");
          this.router.navigate(["/company"])
        }
        else if (res.data[0].type === "1") {
          localStorage.setItem("user_type", "admin");
          this.router.navigate(["/company"])
        }
      }

    })


    // this.api.Payroll_Register(this.register_form.value).then((res: any) => {
    //   console.log(res);

    //   if (res.message == 'Error') {
    //     alert("Mobile Number Already Register in Database");
    //   }
    //   else if (res.message == 'Success') {
    //     alert("Register Successfull");
    //     this.router.navigate(["./login"]);
    //   }

    // })


  }

  public get_city() {
    this.api.get("Cities").subscribe((res: any) => {
      this.city = res.Data;
    })
  }

}
