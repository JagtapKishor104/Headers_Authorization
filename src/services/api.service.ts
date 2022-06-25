import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }



  public BaseUrl = "http://192.168.0.105/API/public";

  cities = '';
  emp_attendence = '';
  emp_name = '';
  emp_type = "";
  requestHeaders = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    .append('basic', '123456789');

  JSON_to_URLEncoded(element: any, key?: any, list?: any) {
    let new_list = list || [];
    if (typeof element === 'object') {
      for (let idx in element) {
        this.JSON_to_URLEncoded(
          element[idx],
          key ? key + '[' + idx + ']' : idx,
          new_list
        );
      }
    } else {
      new_list.push(key + '=' + encodeURIComponent(element));
    }
    return new_list.join('&');
  }



  isLoggesIn() {
    if (this.get_admin_id() !== null || this.get_emp_id() !== null) {
      return true;
    }
    else {
      return false;
    }
  }
  // Payroll_Register
  Payroll_Register_url = "http://192.168.70.111/payrollApi/API/index.php/users/register";
  public Payroll_Register(body: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const header = {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
          .set('basic', `123456789`)
      };
      const param = this.JSON_to_URLEncoded(body);
      console.log(param);
      this.http.post(`${this.BaseUrl}/users/register`, param, header).subscribe((res: any) => {
        resolve(res);
      }, error => {
        resolve(error);
      });
    });
  }


  // public emp_getbyid(body: any): Promise<any> {
  //   return new Promise<any>((resolve, reject) => {
  //     const header = {
  //       headers: new HttpHeaders()
  //         .set('Content-Type', 'application/x-www-form-urlencoded')
  //         .set('basic', `123456789`)
  //     };

  //     const param = this.JSON_to_URLEncoded(body);
  //     console.log(param);
  //     this.http.post(`${this.BaseUrl}/Employees/getById`, param, header).subscribe((res) => {
  //       resolve(res);
  //     }, error => {
  //       resolve(error);
  //     })
  //   })
  // }






  get_slip(): Observable<any> {
    return this.http.get(`${this.BaseUrl}/Attendance`,
      {
        headers: this.requestHeaders
      });
  }

  get_user_type() {
    return localStorage.getItem("user_type");
  }
  get_admin_id() {
    return localStorage.getItem("admin_id");
  }

  get_emp_id() {
    return localStorage.getItem("emp_id");
  }
  get_admin_name() {
    return localStorage.getItem("admin_name");
  }
  get_emp_name() {
    return localStorage.getItem("first_name");
  }
  get_agency_id() {
    return localStorage.getItem("Agency_id");
  }

  get(url: any) {
    return this.http.get(`${this.BaseUrl + "/" + url}`
      // , {
      //   headers: this.requestHeaders
      // }
    );
  }


  public post(url: any, body: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const header = {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded' )
         
        // .set('basic', '123456789')
      };
      const param = this.JSON_to_URLEncoded(body);
      console.log(param);
      this.http.post(`${this.BaseUrl + "/" + url}`, param, header).subscribe((res: any) => {
        resolve(res);
      }, error => {
        resolve(error);
      });
    });
  }


  public uploadImage(image: File): Observable<any> {
    console.log("image", image);

    const formData = new FormData();

    formData.append('photo', image);

    return this.http.post(`${this.BaseUrl + "/" + 'Employee/add'}`, formData);

  }


  uploadFile(files: File[], body: any) {
    console.log(body);

    const formData = new FormData();
    Array.from(files).forEach(f => formData.append('photo', f));

    formData.append("data", body);
    console.log(body);
    

    return this.http.post(this.BaseUrl + '/Employee/add', formData);
  }




}
