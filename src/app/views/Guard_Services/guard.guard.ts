import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {ApiService} from "../../../services/api.service";
import {Router} from "@angular/router";
@Injectable({
  providedIn: 'root'
})
export class GuardGuard implements CanActivate {
  constructor( private auth:ApiService, private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree | any> | Promise<boolean | UrlTree | any> | boolean | UrlTree | any {
    if(this.auth.isLoggesIn()){
      return true;

    }
    // else{
    //   this.router.navigate(["/login"])
    // }

      
     
  }
  
}
