import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ApiService } from "../../../services/api.service";
import { BsDatepickerDirective } from 'ngx-bootstrap/datepicker';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { flagSet } from '@coreui/icons';

@Component({
  selector: 'app-buttons',
  templateUrl: './attendence.component.html',
  styleUrls: ['./attendence.component.scss']
})
export class ButtonsComponent implements OnInit {
  @ViewChild(BsDatepickerDirective, { static: false }) datepicker?: BsDatepickerDirective;

  Data: any;
  emp_id!: any;
  attendance_date: any;
  // attendance_date!: any;
  myDateValue!: Date;
  toDate!: Date;
  fromDate!: Date
  minDate!: Date;
  maxDate!: Date;
  duplicateArray: any[] = [];
  msg!: string;
  showmsg: boolean = false;
  tableSize: number = 10;
  tableSizes: any = [3, 6, 9, 12];
  page!: any;
  count: number = 0;
  currentIndex = -1;
  tutorial: any;
  msg1!: string;
  showmsg1: boolean = true;
  admin_id: string | null;
  userType: string | null;
  emp_ids: string | null;
  attendence: any;
  empname: any = this.api.emp_name;
  empexistData: any;
  showadd: boolean = false;
  showupdate: boolean = false;
  att_id: any;
  value: any;
  att_type: any;
  plFlag: boolean = false;
  constructor(
    private api: ApiService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.get_attendence();
    if (!this.empname) {
      this.get_empname();
    }

    this.admin_id = localStorage.getItem("admin_id");
    this.emp_ids = localStorage.getItem("emp_id");
    this.userType = localStorage.getItem("user_type");
    // console.log("userType",this.userType);

  }
  ngOnInit(): void {


    if (this.admin_id == null) {

      this.showmsg1 = false;
      this.msg1 = "Please Login"

    }
    else if (this.admin_id !== null) {
      this.showmsg1 = true;

      // this.get_Attendence();

    }
    if (this.userType == "emp") {
      console.log("emp attendence id");

    }
    else {


    }





    this.fromDate = new Date("01/12/2022");
    // this.duplicateArray = this.Data;
  }

  type(event: any) {
    console.log(event.target.value);
    if (event.target.value == "PL") {
      this.plFlag = true;
    }
    else {
      this.plFlag = false;
    }
  }

  edit(id: any) {
    this.showadd = false;
    this.showupdate = true;
    const param = {
      "id": id,
    }
    console.log(param);
    this.api.post("Attendance/getById", param).then((data: any) => {
      console.log(data);
      data.data.forEach((element: any) => {
        let res = element;

        this.myform.patchValue(
          {
            "emp_id": res.emp_id,
            "attendance_id": res.attendance_id,
            "pl_type": res.pl_type,
            "type": res.type,
            "emp_desc": res.emp_desc,
            "punch_in_time": res.punch_in_time,
            "punch_out_time": res.punch_out_time,
            "attendance_date": res.attendance_date,
          });
        if (res.type == "PL") {
          this.plFlag = true;
        }
        else if (res.type == "P" || res.type == "A" || res.type == "UL") {
          this.plFlag = false;
        }
      });
    });



  }

  update() {
    let info = this.myform.value;
    if (info.type == "A" || info.type == "P" || info.type == "UL") {
      const param = {
        "emp_id": info.emp_id,
        "attendance_id": info.attendance_id,
        "emp_desc": info.emp_desc,
        "punch_in_time": info.punch_in_time,
        "punch_out_time": info.punch_out_time,
        "attendance_date": info.attendance_date,
        "pl_type": info.pl_type = "N.A",
        "type": info.type,
      }
      console.log(param);
      this.api.post("Attendance/edit_attendance", param).then((data: any) => {
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
          title: 'Employee Updated'
        });
        this.get_attendence();
      });
      let ref = document.getElementById("cancel");
      ref?.click();
    }
    else if (info.type == "PL") {
      const param = {
        "emp_id": info.emp_id,
        "attendance_id": info.attendance_id,
        "emp_desc": info.emp_desc,
        "punch_in_time": info.punch_in_time,
        "punch_out_time": info.punch_out_time,
        "attendance_date": info.attendance_date,
        "pl_type": info.pl_type,
        "type": info.type,
      }
      console.log(param);
      this.api.post("Attendance/edit_attendance", param).then((data: any) => {
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
          title: 'Employee Updated'
        });
        this.get_attendence();
      });
      let ref = document.getElementById("cancel");
      ref?.click();
    }
  }

  openmodal() {
    this.myform.reset();
    this.showadd = true;
    this.showupdate = false;
    this.plFlag = false;
  }

  myform = this.fb.group({
    emp_id: new FormControl(""),
    attendance_date: new FormControl(""),
    attendance_id: new FormControl(""),
    punch_in_time: new FormControl(""),
    punch_out_time: new FormControl(""),
    emp_desc: new FormControl(""),
    type: new FormControl("", Validators.required),
    pl_type: new FormControl("", Validators.required)
  });
  postattendence() {
    console.log(this.myform.value);
    this.empexist();
  }
  @HostListener('window:scroll')
  onScrollEvent() {
    this.datepicker?.hide();
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

  onDateChange(newDate: Date) {
    console.log(newDate);
  }
  filterDate() {
    let fromdate = moment(this.fromDate).format('DD/MM/YYYY');
    console.log("fromdate", fromdate);

    let todate = moment(this.toDate).format('DD/MM/YYYY');
    console.log("todate", todate);

    if (this.fromDate && this.toDate) {
      const selectedMembers = this.Data.filter((m: any) => {
        return (
          this.reverseAndTimeStamp(m.fromDate) >=
          this.reverseAndTimeStamp(fromdate) &&
          this.reverseAndTimeStamp(m.fromDate) <=
          this.reverseAndTimeStamp(todate)
        );
      });
      this.duplicateArray = selectedMembers;
    } else {
      this.duplicateArray = this.Data;


    }

    console.log("Hello ", this.duplicateArray); // the result objects
    if (this.duplicateArray.length > 0) {
    }
    else {
      this.showmsg = true;
      this.msg = "Result Not Found";
    }
  }
  reverseAndTimeStamp(dateString: any) {
    const reverse = new Date(dateString.split('/').reverse().join('/'));
    return reverse.getTime();
  }

  public get_attendence() {
    const param =
    {
      "agency_id": localStorage.getItem("Agency_id")
    }
    this.api.post("Attendance/getbyagency_idattendance?agency_id=1", param).then(
      (res: any) => {
        this.attendence = res.Data;
        console.log("Attendence components", res);
      })
  }

  get_empname() {
    const param =
    {
      agency_id: localStorage.getItem("Agency_id"),
    }
    this.api.post("Employee/getbyagency_idemployee", param).then(
      (res: any) => {
        console.log(res);
        this.empname = res.Data;
        this.empname.forEach((element: any) => {
          element.full_name = element.first_name + ' ' + element.last_name;
        });
        console.log(" EmpName in Components", this.empname);

      })
  }

  delete(id: any) {
    const param =
    {
      "id": id
    }
    console.log(param);
    
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
        this.api.post("Attendance/delete_attendance", param).then((res: any) => {
          console.log(res);
          this.get_attendence();
          
        })
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
          )
      }
    })
  }
  empexist() {
    let info = this.myform.value;
    const param = {
      "emp_id": info.emp_id,
      "attendance_date": info.attendance_date
    }
    this.api.post("Attendance/idExists", param).then((res: any) => {
      this.empexistData = res;
      if (this.empexistData.data == "Attendance not found") {
        info = this.myform.value;
        const param = {
          "emp_id": info.emp_id,
          "emp_desc": info.emp_desc,
          "punch_in_time": info.punch_in_time,
          "punch_out_time": info.punch_out_time,
          "attendance_date": info.attendance_date,
          "type": info.type,
          "pl_type": info.pl_type,
        }
        console.log(param);
        this.api.post("Attendance/create_attandance", param).then((data: any) => {
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
            title: 'Employee Added Successfully'
          });
          this.get_attendence();
        });
        let ref = document.getElementById("cancel");
        ref?.click();
        this.myform.reset();



      } else if (res.message === 'success') {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,

        })

        Toast.fire({
          icon: 'warning',
          title: 'Employee Already Exist'
        });



      }
    });


  }



}




