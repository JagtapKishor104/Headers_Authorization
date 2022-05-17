import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,
  ) { }

  requestHeaders = new HttpHeaders().set('Content-Type', 'text')
    .append('basic', '_Your Headers_');

  getstoreApiurl = "https://growiseit.com/movemykart/API/index.php/storeTypes";

  public getstore(): Observable<any> {


    return this.http.get(this.getstoreApiurl, {
      headers: this.requestHeaders
    })
  }
}
