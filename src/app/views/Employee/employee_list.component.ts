import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ApiService } from "../../../services/api.service";
import { NgxSpinnerService } from "ngx-spinner";
import Swal from 'sweetalert2';
import * as moment from 'moment';
@Component({
  selector: 'app-accordions',
  templateUrl: './employee_list.component.html',
  styleUrls: ['./employee_list.component.scss']
})
export class AccordionsComponent implements OnInit {
  @ViewChild('myInput') myInputVariable: ElementRef | any;

  data!: any;
  items = [1, 2, 3, 4];
  addbtn: boolean = false;
  updatebtn: boolean = false;
  Employee_List: any = this.api.emp_name;
  emp_type_list: any = this.api.emp_type;
  click: boolean = true;
  tableSize: number = 5;
  tableSizes: any = [3, 6, 9, 12];
  page: number = 1;
  Data: any;
  emp_id!: any;
  attendance_date!: any;
  myDateValue!: Date;
  toDate!: Date;
  fromDate!: Date
  minDate!: Date;
  maxDate!: Date;
  duplicateArray: any[] = [];
  msg!: string;
  showmsg: boolean = false;
  showmsg1: boolean = false;
  count: number = 0;
  currentIndex = -1;
  tutorial: any;
  number: any;
  admin_id: any;
  msg1!: string;
  userType: any;
  getEmpId: string | null;
  showstatus: boolean = false;
  currentDate = new Date();
  company: any;
  city: any;
  supervisor: any;
  photo!: any;
  imgFile: any;
  logoimage: any;
  imageSrc!: any;
  file: any;
  cover: any;
  image_name: any;
  file_name: any;
  image_data: any;
  files: any;
  dynamicArray: Array<any> = [];
  newDynamic: any = {};

  hide: any;
  index: number = 0;
  spouse_details: any[] = [];
  family_details: any[] = [];
  familyD: any[] = [];
  lang_array: any[] = [];
  lang_values: any = {};
  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private spinner: NgxSpinnerService,
  ) {
    this.newDynamic = { family_name: "", family_aadhar_no: "", family_dob: "", family_age: "", family_sex: "" };
    this.dynamicArray.push(this.newDynamic);

    console.log(this.api.cities)
    if (this.api.cities) {
      this.city = this.api.cities;
    } else {
      this.get_city()
    }

    this.get_supervisor();
    this.get_company();


    if (!this.emp_type_list) {
      this.get_emp_type();

    }

    if (!this.Employee_List) {
      this.get_employee_list();

    }

    this.admin_id = this.api.get_admin_id();
    console.log("admin id", this.admin_id);
    this.userType = localStorage.getItem("user_type");
    this.getEmpId = localStorage.getItem("emp_id");
    console.log("User type=>", this.userType);

  }

  ngOnInit(): void {
    if (this.admin_id !== null) {
      this.showmsg1 = true;
      this.get_employee_list();
    }
    else if (this.admin_id == null) {
      this.msg1 = "Please Login"
      this.showmsg1 = false;
    }

    if (this.userType == "emp" && this.getEmpId !== null) {
      // this.get_emp_getbyid()
    }


  }

  reset() {
    console.log(this.myInputVariable.nativeElement.files);
    this.myInputVariable.nativeElement.value = "";
    console.log(this.myInputVariable.nativeElement.files);
    this.imageSrc = '';
  }


  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.get_employee_list();
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.get_employee_list();
  }

  myform = this.fb.group({
    // emp_id: new FormControl("", [Validators.required]),
    gender: new FormControl("", Validators.required),
    address: new FormControl("", Validators.required),
    temp_address: new FormControl("", Validators.required),
    mobile: new FormControl("", Validators.required),
    emergency_contact_num: new FormControl("", Validators.required),
    emp_type_id: new FormControl("", Validators.required),
    joining_date: new FormControl("", Validators.required),
    designation: new FormControl("", Validators.required),
    // status: new FormControl("", Validators.required),
    // emp_password: new FormControl("", Validators.required),
    company_id: new FormControl("", Validators.required),
    city_id: new FormControl("", Validators.required),
    supervisor_id: new FormControl("", Validators.required),
    // photo: new FormControl(" ", Validators.required),
    // agency_id: new FormControl(" ", Validators.required),
    spouse_name: new FormControl(""),
    spouse_dob: new FormControl(""),
    spouse_aadhar: new FormControl(""),
    blood_group: new FormControl(""),
    birth_mark1: new FormControl(""),
    birth_mark2: new FormControl(""),
    marital_status: new FormControl(""),
    father_name: new FormControl(""),
    mother_name: new FormControl(""),
    first_name: new FormControl(""),
    last_name: new FormControl(""),
    dob: new FormControl(""),
    pan_number: new FormControl(""),
    adhar_number: new FormControl(""),
    age: new FormControl(""),
    birth_place: new FormControl(""),
    nominee_name: new FormControl(""),
    nominee_dob: new FormControl(""),
    nominee_relation: new FormControl(""),
    pre_org_name: new FormControl(""),
    pre_doj: new FormControl(""),
    pre_pf_no: new FormControl(""),
    pre_uan_no: new FormControl(""),
    pre_settled: new FormControl(""),
    bank_branch: new FormControl(""),
    bank_account: new FormControl(""),
    bank_address: new FormControl(""),
    bank_ifsc: new FormControl(""),
  });

  onFileChanged(e: any) {
    this.file = e.target.files
    if (e.target.files && e.target.files.length) {
      let [file] = e.target.files;
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imgFile = reader.result;
        this.myform.patchValue({
          photo: reader.result,
        });
        // for image load or preview
        let photo = e.target.files[0];
        reader.onload = e => this.imageSrc = reader.result;
        reader.readAsDataURL(photo);
      };
    }
  }

  showbtn() {

    this.myform.reset();
    this.addbtn = true;
    this.updatebtn = false;
    this.showstatus = true;

  }

  deleteRow(index: any) {
    console.log(index);

    if (this.dynamicArray.length == 1) {
      alert("Can't delete the row when there is only one row");

    }
    else {
      this.dynamicArray.splice(index, 1);
      alert("Row deleted successfully")

    }
  }
  addRow() {
    this.newDynamic = { family_name: "", family_aadhar_no: "", family_dob: "", family_age: "", family_sex: "" };
    this.dynamicArray.push(this.newDynamic);
    alert("Added");
    console.log(this.dynamicArray);
  }



  statussubmit(d: any) {
    var status = !d.status
    console.log(status);
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
          d.status = 0;
        }
        else {
          d.status = 1;
        }
        const param = {
          "emp_id": d.emp_id,

          "status": d.status,
        }
        console.log(param);
        this.api.post("Employee/edit_employee", param).then((res: any) => {
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



  delete(id: any) {
    const param =
    {
      "emp_id": id
    }
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
        this.api.post("Employee/delete_employee", param).then((res: any) => {
          console.log(res);
          this.get_employee_list();

        })
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  }


  CheckBox(e: any) {
    console.log(e.target.attributes[1].value);

    if (e.target.attributes[1].value) {
      if (this.lang_array.includes(e.target.attributes[1].value)) {
        console.log("value exist");
        const index = this.lang_array.indexOf(e.target.attributes[1].value);
        console.log(index);
        if (index > -1) {
          this.lang_array.splice(index, 1)
          this.lang_values = this.lang_array;
          console.log("Language values", this.lang_values);
          const marathi_values =
          {
            marathi_speaks: this.lang_values.includes("marathi_speak"),
            marathi_write: this.lang_values.includes("marathi_write"),
            marathi_read: this.lang_values.includes("marathi_read"),
          }
          console.log("marathi_values", marathi_values);
          const hindi_values =
          {
            hindi_speaks: this.lang_values.includes("hindi_speak"),
            hindi_write: this.lang_values.includes("hindi_write"),
            hindi_read: this.lang_values.includes("hindi_read"),
          }
          console.log("Hindi_values", hindi_values);
          const english_speak =
          {
            english_speaks: this.lang_values.includes("english_speak"),
            english__write: this.lang_values.includes("english_write"),
            english_read: this.lang_values.includes("english_read"),
          }
          console.log("English_values", english_speak);
        }
      }
      else {
        this.lang_array.push(e.target.attributes[1].value);
        this.lang_values = this.lang_array;
        console.log(this.lang_values);
        const marathi_values =
        {
          marathi_speaks: this.lang_values.includes("marathi_speak"),
          marathi_write: this.lang_values.includes("marathi_write"),
          marathi_read: this.lang_values.includes("marathi_read"),
        }
        console.log("marathi_values", marathi_values);
        const hindi_values =
        {
          hindi_speaks: this.lang_values.includes("hindi_speak"),
          hindi_write: this.lang_values.includes("hindi_write"),
          hindi_read: this.lang_values.includes("hindi_read"),
        }
        console.log("Hindi_values", hindi_values);
        const english_speak =
        {
          english_speaks: this.lang_values.includes("english_speak"),
          english_write: this.lang_values.includes("english_write"),
          english_read: this.lang_values.includes("english_read"),
        }
        console.log("English_values", english_speak);
      }
    }
    else {
      console.log("next Block");
    }
  }

  submit() {
    console.log(this.myform.value);
    let info = this.myform.value;
    const spouse_values = {
      spouse_name: info.spouse_name,
      spouse_dob: info.spouse_dob,
      spouse_aadhar: info.spouse_aadhar
    }
    const language_values =
    {
      marathi_values: {
        marathi_speaks: this.lang_values.includes("marathi_speak"),
        marathi_write: this.lang_values.includes("marathi_write"),
        marathi_read: this.lang_values.includes("marathi_read"),
      },
      hindi_values: {
        hindi_speaks: this.lang_values.includes("hindi_speak"),
        hindi_write: this.lang_values.includes("hindi_write"),
        hindi_read: this.lang_values.includes("hindi_read"),
      },
      english_speak: {
        english_speaks: this.lang_values.includes("english_speak"),
        english_write: this.lang_values.includes("english_write"),
        english_read: this.lang_values.includes("english_read"),
      }
    }
    console.log(language_values);
    console.log(this.dynamicArray);
    const birth_marks_values =
    {
      birth_marks1: info.birth_mark1,
      birth_marks2: info.birth_mark2,
    }
    const nominee_values =
    {
      nominee_name: info.nominee_name,
      nominee_dob: info.nominee_dob,
      nominee_relation: info.nominee_relation,
    }
    const pre_emp_value =
    {
      pre_org_name: info.pre_org_name,
      pre_doj: info.pre_doj,
      pre_pf_no: info.pre_pf_no,
      pre_uan_no: info.pre_uan_no,
      pre_settled: info.pre_settled,
    }

    const bank_value =
    {
      bank_branch: info.bank_branch,
      bank_account: info.bank_account,
      bank_address: info.bank_address,
      bank_ifsc: info.bank_ifsc,
    }
    this.spouse_details.push(spouse_values);
    const param = {
      emp_password: info.emp_password = "123",
      first_name: info.first_name,
      last_name: info.last_name,
      gender: info.gender,
      address: info.address,
      temp_address: info.temp_address,
      mobile: info.mobile,
      emergency_contact_num: info.emergency_contact_num,
      emp_type_id: info.emp_type_id,
      company_id: info.company_id,
      joining_date: info.joining_date,
      status: info.status = "1",
      designation: info.designation,
      photo: "photo.jpg",
      supervisor_id: info.supervisor_id,
      city_id: info.city_id,
      agency_id: localStorage.getItem("Agency_id"),
      spouse_details: JSON.stringify(this.spouse_details),
      family_details: JSON.stringify(this.dynamicArray),
      blood_group: info.blood_group,
      birth_mark: JSON.stringify(birth_marks_values),
      marital_status: info.marital_status,
      father_name: info.father_name,
      mother_name: info.mother_name,
      dob: info.dob,
      pan_number: info.pan_number,
      adhar_number: info.adhar_number,
      age: info.age,
      birth_place: info.birth_place,
      nominee: JSON.stringify(nominee_values),
      prev_employee: JSON.stringify(pre_emp_value),
      bank_details: JSON.stringify(bank_value),
      languages: JSON.stringify(language_values)

    }
    console.log(param);
    this.api.post("Employee/create100", param).then((res: any) => {
      console.log("Res", res);
      if (res.data == "Already mobile register") {
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
      else if (res.message == 'success') {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        })
        Toast.fire({
          icon: 'success',
          title: 'Employee Added'
        });
        if (this.userType == "emp") {
          // this.get_emp_getbyid()
        } else if (this.userType == "admin") {
          this.get_employee_list();
        }
        var ref = document.getElementById("cancel");
        ref?.click();
        this.myform.reset();


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
          title: 'Something Went Wrong'
        });
      }


    })

  }

  // addFieldValue() {


  //   this.fieldArray.push(this.newDynamic)
  //   this.newDynamic = {};

  // }
  update() {
    let info = this.myform.value;
    let date = moment(info.joining_date).format('YYYY-MM-DD');
    const param = {
      "emp_id": info.emp_id,
      "first_name": info.first_name,
      "last_name": info.last_name,
      "address": info.address,
      "mobile": info.mobile,
      "joining_date": date,
      "emp_type_id": info.emp_type_id,
      "company_id": info.company_id,
      "gender": info.gender,
      "designation": info.designation,
      "supervisor_id": info.supervisor_id,
      "city_id": info.city_id,
      "photo": info.photo
    }
    console.log(param);
    this.api.post("Employee/edit_employee", param).then((res: any) => {
      console.log(res);
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
      this.get_employee_list();

      var ref = document.getElementById("cancel");
      ref?.click();

    })

  }

  editdata(id: any) {
    const param =
    {
      "emp_id": id,
    }
    console.log(param);
    this.addbtn = false;
    this.updatebtn = true;
    this.showstatus = true;

    this.api.post("Employee/getbyid_employee", param).then((data: any) => {
      console.log(data);
      data.data.forEach((element: any) => {
        let res = element;
        const bank = JSON.parse(res.bank_details);
        const birth = JSON.parse(res.birth_mark);
        const spouse = JSON.parse(res.spouse_details);
        const prev_employee = JSON.parse(res.prev_employee);
        const nominee = JSON.parse(res.nominee);
        const family = JSON.parse(res.family_details);
        console.log(family);
        for (let i = 0; i < family.length; i++) {
          console.log(i);
          console.log("family lenght",family.length);    
          this.newDynamic.family_name = family[i].family_name;
          this.newDynamic.family_aadhar_no = family[i].family_aadhar_no;
          this.newDynamic.family_dob = family[i].family_dob;
          this.newDynamic.family_age = family[i].family_age;
          this.newDynamic.family_sex = family[i].family_sex;
        if(i<family.length-1)
        {
          this.newDynamic = { family_name: "", family_aadhar_no: "", family_dob: "", family_age: "", family_sex: "" };
          this.dynamicArray.push(this.newDynamic); 
        }
        }

        this.myform.patchValue(
          {
            "emp_id": res.emp_id,
            "first_name": res.first_name,
            "last_name": res.last_name,
            "address": res.address,
            "mobile": res.mobile,
            "joining_date": res.joining_date,
            "emp_type_id": res.emp_type_id,
            "company_id": res.company_id,
            "gender": res.gender,
            "designation": res.designation,
            "supervisor_id": res.supervisor_id,
            "city_id": res.city_id,
            "photo": res.photo,
            "age": res.age,
            "dob": res.dob,
            "birth_place": res.birth_place,
            "emergency_contact_num": res.emergency_contact_num,
            "temp_address": res.temp_address,
            "pan_number": res.pan_number,
            "adhar_number": res.adhar_number,
            "blood_group": res.blood_group,
            "bank_branch": bank.bank_branch,
            "bank_account": bank.bank_account,
            "bank_address": bank.bank_address,
            "bank_ifsc": bank.bank_ifsc,
            "birth_mark1": birth.birth_marks1,
            "birth_mark2": birth.birth_marks2,
            "marital_status": res.marital_status,
            "father_name": res.father_name,
            "mother_name": res.mother_name,
            "spouse_aadhar": spouse[0].spouse_aadhar,
            "spouse_name": spouse[0].spouse_name,
            "spouse_dob": spouse[0].spouse_dob,
            "pre_org_name": prev_employee.pre_org_name,
            "pre_doj": prev_employee.pre_doj,
            "pre_pf_no": prev_employee.pre_pf_no,
            "pre_uan_no": prev_employee.pre_uan_no,
            "pre_settled": prev_employee.pre_settled,
            "nominee_name": nominee.nominee_name,
            "nominee_dob": nominee.nominee_dob,
            "nominee_relation": nominee.nominee_relationb,
            "family.family_name": family[0].family_name
          })


      });
    })
  }



  // get Employee List
  // get_employee_list() {
  //   this.api.get("Employee").subscribe({
  //     next: (res: any) => {
  //       this.Employee_List = res.Data;
  //       console.log("Emp list in compo", this.Employee_List);
  //     }
  //   })
  // }

  // get_emp_getbyid() {
  //   const param = {
  //     id: this.getEmpId
  //   }
  //   console.log("param", param);
  //   this.api.emp_getbyid(param).then((res) => {
  //     this.Employee_List = res.data;
  //     console.log(this.Employee_List);
  //   })
  // }

  get_emp_type() {
    this.api.get("Emptype").subscribe({
      next: (res: any) => {
        this.emp_type_list = res.data;
        console.log("emp type_list in compo", this.emp_type_list);

      }
    })
  }

  get_city() {
    this.api.get("Cities").subscribe((res: any) => {
      console.log(res);
      this.city = res.Data;
      // this.city = this.api.cities;

    })
  }

  get_company() {
    this.api.get("Company").subscribe({
      next: (res: any) => {
        this.company = res.Data;
        console.log("comapny", this.company);

      }
    })
  }
  get_employee_list() {
    const param =
    {
      "agency_id": localStorage.getItem("Agency_id")
    }
    console.log("Employee/getbyagency_idemployee param", param);

    this.api.post("Employee/getbyagency_idemployee", param).then(
      (res: any) => {
        this.Employee_List = res.Data;
        console.log("getbyagency_idemployee", this.Employee_List);

      }
    )
  }

  get_supervisor() {
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

  // {
  //   this.api.get("Supervisor").subscribe((res: any) => {


  //     this.supervisor = res.data;

  //     this.supervisor.forEach((element: any) => {
  //       element.fullname = element.firstname + "" + element.lastname;
  //     })
  //     console.log("Supervisor", this.supervisor);
  //   })
  // }
}




