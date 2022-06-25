import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ApiService } from 'src/services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-comapny',
  templateUrl: './comapny.component.html',
  styleUrls: ['./comapny.component.scss']
})
export class ComapnyComponent implements OnInit {
  city: any = this.api.cities;
  id!: any;

  company: any;
  showadd: boolean = false;
  showupdate: boolean = false;
  tableSize: number = 5;
  tableSizes: any = [3, 6, 9, 12];
  page!: any;
  currentIndex = -1;
  count: number = 0;
  showstatus: boolean = true;
  supervisor: any;

  constructor(
    private api: ApiService,
    private fb: FormBuilder
  ) {
    if (!this.city) {
      this.get_city();
    
     
    }


    this.get_company();
    this.get_supervisor();
    this.getbysupervisorid_company()
  }

  ngOnInit(): void {
   

  }

  myform = this.fb.group({
    id:new FormControl(""),
    name: new FormControl(""),
    mobile: new FormControl(""),
    city_id: new FormControl(""),
    contact_person_name: new FormControl(""),
    status: new FormControl(""),
    address: new FormControl(""),
    created_at: new FormControl(""),
    agency_id:new FormControl(""),
    supervisor_id:new FormControl(""),
    
  });

  get_city() {
    this.api.get("Cities").subscribe({
      next: (res: any) => {
        this.city = res.Data;
        console.log("city In  components", this.city);
      }
    })
  }


  public get_supervisor() {
    let agency_id = this.api.get_agency_id()
    const param =
    {
      agency_id: agency_id
    }
    this.api.post("Admin/getSupervisorsByAgencyId", param).then((res: any) => {
      console.log(res);
      this.supervisor = res.Data;

    })
  }

  public get_company() {
    let agency_id = this.api.get_agency_id()
    const param =
    {
      agency_id: agency_id
    }
    this.api.post("Company/getbyagency_idcompany", param).then((res: any) => {
      this.company = res.data;
      console.log("company",res);

    })
  }

  public getbysupervisorid_company()
  {
    const id=localStorage.getItem("supervisor_id");
    const param=
    {
      "supervisor_id":id
    }
    console.log("getbysupervisorid_company supervisor_id",param);
    this.api.post("Company/getbysupervisorid_company",param).then((res:any)=>
    {
      console.log("res",res);
      this.company=res.data
    })
    
  }

  statussubmit(d: any) {
    console.log(" Current status",d.status);
    
    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Changed it!'
    }).then((result) => {
      if (result.isConfirmed) {
        if (d.status == 1) {
          d.status = 0
        }
        else {
          d.status = 1
        }
        const param = {
          "id": d.id,
          "status": d.status,
        }
        console.log(param);
        this.api.post("Company/edit_company", param).then((res: any) => {
          console.log(res);
        })
        Swal.fire(
          'Changed!',
          'Status Changed Successfully',
          'success'
        )
      }
    })
  }


  sendcompanydata() {
    let info = this.myform.value;
    const agency_id=this.api.get_agency_id();
    const param = {
      "name": info.name,
      "mobile": info.mobile,
      "address": info.address,
      "city_id": info.city_id,
      "status": info.status = "1",
      "contact_person_name": info.contact_person_name,
      "created_at":info.created_at="2022-03-06",
      "agency_id":agency_id,
      "supervisor_id":info.supervisor_id
      
    }
    console.log("sendcompanydata",param);


    this.api.post("Company/createcompany", param).then((res: any) => {
      console.log(res);
      if (res.message == 'success') {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        })
        Toast.fire({
          icon: 'success',
          title: 'Company Added'
        });
        this.get_company();
        let ref = document.getElementById("cancel");
        ref?.click();
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
          title: 'Company Added failed'
        });
      }

    });


  }

  edit(id: any) {
    this.showadd = false;
    this.showupdate = true;
    this.showstatus = false;
    const param = {
      "id": id,
    }
    console.log(id);
    this.api.post("Company/getbyid_company", param).then((data: any) => {
      console.log(data);
      data.data.forEach((element: any) => {
        let res = element;
        this.myform.patchValue(
          {
            "id":res.id,
            "name": res.name,
            "mobile": res.mobile,
            "address": res.address,
            "city_id": res.city_id,
            "contact_person_name": res.contact_person_name,
            "supervisor_id":res.supervisor_id
          })
      })

    });
    let ref = document.getElementById("cancel");
    ref?.click();

  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    // this.get_Attendence();
  }
  onTableDataChange(event: any) {
    this.page = event;
    // this.get_Attendence();
  }

  update() {
    let info = this.myform.value;
    const param = {
      "id": info.id,
      "name": info.name,
      "mobile": info.mobile,
      "address": info.address,
      "city_id": info.city_id,
      "contact_person_name": info.contact_person_name,
    }
    this.api.post("Company/edit_company", param).then((data: any) => {
      console.log(data);
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,

      })

      Toast.fire({
        icon: 'success',
        title: 'Company Updated'
      });
      this.get_company();
    });
    let ref = document.getElementById("cancel");
    ref?.click();

  }



  openmodal() {
    this.myform.reset();
    this.showadd = true;
    this.showupdate = false;
    this.showstatus = true;
  }

}
