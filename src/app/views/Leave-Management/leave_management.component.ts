import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ApiService } from 'src/services/api.service';
import { setOptions } from '@mobiscroll/angular';
import * as moment from 'moment';

@Component({
  selector: 'app-charts',
  templateUrl: './leave_management.component.html',
  styleUrls: ['./leave_management.component.scss']
})
export class ChartsComponent {
  leaves: any;
  showadd: boolean = false;
  showupdate: boolean = false;
  empname: any;
  user_type: any;
  selectCounter:any;
  constructor(
    private api: ApiService,
    private fb: FormBuilder

  ) {
    this.get_leave();
    this.get_emp()
    this.user_type = localStorage.getItem("user_type")
  }
  setOptions:any=({
    theme: 'ios',
    themeVariant: 'light'
});
  get_leave() {
    this.api.get("Leaves").subscribe((res: any) => {
      this.leaves = res.Data;
      console.log("leaves", this.leaves);
    })


  }


  myform = this.fb.group({
    leave_id: new FormControl(""),
    emp_id: new FormControl(""),
    leave_subject: new FormControl(""),
    leave_dates: new FormControl(""),
    leave_message: new FormControl(""),
    leave_type: new FormControl(""),
    leave_status: new FormControl(""),
    apply_date: new FormControl(""),
  });

  save() {
    console.log(this.myform.value);
    const info=this.myform.value;
   length= info.leave_dates.length;
   console.log(length);

    let date = moment(info.leave_dates).format('YYYY-MM-DD');
console.log(date);

    // let allDates: any[] = [];
    // var Dates = (<HTMLInputElement>document.getElementById("dates")).value;
    // allDates.push(Dates)
    // console.log(allDates);
  }

  openmodal() {
    // this.myform.reset();
    this.showadd = true;
    this.showupdate = false;
  }

  get_emp() {
    const param =
    {
      "agency_id": localStorage.getItem("Agency_id")
    }
    console.log(param);

    this.api.post("Employee/getbyagency_idemployee", param).then((res: any) => {
      console.log(res);
      this.empname = res.Data;
      this.empname.forEach((element: any) => {
        element.full_name = element.first_name + ' ' + element.last_name;
      });
    })
  }

  edit(id: any) {
    const param =
    {
      "emp_id": id
    }
    this.api.post("Leaves/getbyempid_leave", param).then((res: any) => {
      console.log(res);
      this.myform.patchValue(
        {
          leave_id: res.data[0].leave_id,
          emp_id: res.data[0].emp_id,
          leave_subject: res.data[0].leave_subject,
          leave_dates: res.data[0].leave_dates,
          leave_message: res.data[0].leave_message,
          leave_type: res.data[0].leave_type,
          leave_status: res.data[0].leave_status,
          apply_date: res.data[0].apply_date,
        }
      )
    })
  }
}