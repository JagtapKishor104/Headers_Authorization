import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ApiService } from 'src/services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agency',
  templateUrl: './agency.component.html',
  styleUrls: ['./agency.component.scss']
})
export class AgencyComponent implements OnInit {
  photo: any;
  imageSrc: any;
  showadd: boolean = false;
  showupdate: boolean = false;
  Data: any;
  imgFile: any;
  user_type:any;
  constructor(
    private fb: FormBuilder,
    private api: ApiService) {
    this.get_agency()
    this.user_type=localStorage.getItem("user_type")
  }

  ngOnInit(): void {
  }
  myform = this.fb.group(
    {
      agency_id: new FormControl(""),
      name: new FormControl(""),
      status: new FormControl("1"),
      address: new FormControl(""),
      cover: new FormControl(""),
      mobile_number: new FormControl(""),
      contact_person_name: new FormControl(""),
      admin_id: new FormControl(""),

    }
  )

  showbtn() {
    this.myform.reset();
    this.showadd = true;
    this.showupdate = false;

  }

  changeimage(e: any) {
    if (e.target.files && e.target.files.length == 1) {
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

  get_agency() {
    const param=
    {
       agency_id:localStorage.getItem("Agency_id")
    }
    console.log(param);
    
    this.api.post("Agency/getbyid_agency",param).then((res: any) => {
      this.Data = res.data;
      console.log(this.Data);
    
    });
  }
  saveData() {
    this.myform.value;
  }

  status(d: any) {
    console.log(d.status);
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
        else if (d.status == 0) {
          d.status = 1;
        }
        const param = {
          "agency_id": d.agency_id,

          "status": d.status,
        }
        console.log(param);
        this.api.post("Agency/edit_agency", param).then((res: any) => {
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

  editData(id: any) {
    this.showadd = false;
    this.showupdate = true;
    const param =
    {
      "agency_id": id
    }
    this.api.post("Agency/getbyid_agency", param).then((res: any) => {
      console.log(res);
      if (res.message == "success") {
        this.myform.patchValue({
          agency_id: res.data[0].agency_id,
          name: res.data[0].name,
          status: res.data[0].status,
          address: res.data[0].address,
          mobile_number: res.data[0].mobile_number,
          contact_person_name: res.data[0].contact_person_name,
          admin_id: res.data[0].admin_id,
          cover: res.data[0].cover,

        })
      }



    })
  }
  deleteData(id: any) {
    const param =
    {
      "agency_id": id
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
        this.api.post("Agency/del_agency", param).then((res: any) => {
          console.log(res);
          this.get_agency();

        })
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  }

}
