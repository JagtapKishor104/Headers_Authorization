import { Component } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ApiService } from 'src/services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-widgets',
  templateUrl: './list_holiday.component.html',
  styleUrls: ['./list_holiday.component.scss'],
})
export class WidgetsComponent {
  holiday: any;
  showsave: boolean = false;
  showupdate: boolean = false;
  constructor(private api: ApiService,
    private fb: FormBuilder
  ) {
    this.get_holiday();

  }
  myform = this.fb.group({
    holiday_id: new FormControl(""),
    holiday_title: new FormControl(""),
    holiday_desc: new FormControl(""),
    holiday_date: new FormControl(""),
    holiday_type: new FormControl("")
  })


  get_holiday() {
    this.api.get("Holiday").subscribe((res: any) => {
      this.holiday = res.data;
      console.log("Holiday", this.holiday);

    })
  }
  editHoliday(id: any) {
    this.showsave = false;
    this.showupdate = true
    console.log("current holiday id", id);

    const param = {
      "holiday_id": id
    }
    console.log("editholiday param", param);

    this.api.post("Holiday/getbyid_holiday", param).then((res: any) => {
      console.log(res);
    
        this.myform.patchValue(
          {
            "holiday_id": res.holiday_id,
            "holiday_title": res.data[0].holiday_title,
            "holiday_desc": res.data[0].holiday_desc,
            "holiday_date": res.data[0].holiday_date,
            "holiday_type": res.data[0].holiday_type
          })
      
    })





  }


  deleteHoliday(id: any) {
    const param =
    {
      "id": id
    }
    console.log("Deleteparam", param);

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.api.post("Holiday/delete_holiday", param).then((res: any) => {
          console.log(res);
          this.get_holiday();

        })  
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )}
    })


  }


  updateHoliday() {
    const info = this.myform.value;
    const param =
    {
      "holiday_id": info.id,
      "holiday_title": info.holiday_title,
      "holiday_desc": info.holiday_desc,
      "holiday_date": info.holiday_date,
      "holiday_type": info.holiday_type,
    }
    console.log(param);
    this.api.post("Holiday/edit_holiday", param).then((res: any) => {
      console.log(res);
      this.get_holiday();
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      })
      Toast.fire({
        icon: 'success',
        title: 'Holiday Updated'
      });
      let Ref = document.getElementById("cancel1");
      Ref?.click();
    });

  }

  saveHoliday() {
    console.log(this.myform.value);

    const info = this.myform.value;
    let param =
    {
      holiday_title: info.holiday_title,
      holiday_desc: info.holiday_desc,
      holiday_date: info.holiday_date,
      holiday_type: info.holiday_type,

    }
    this.api.post("Holiday/create100", param).then((res: any) => {
      console.log(res);
      if (res.message == "success") {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        })
        Toast.fire({
          icon: 'success',
          title: 'Employee Updated'
        });
        this.get_holiday();
      }
      let Ref = document.getElementById("cancel1");
      Ref?.click();
    })


  }

  openModal() {
    this.myform.reset();
    this.showsave = true;
    this.showupdate = false;
  }
}


