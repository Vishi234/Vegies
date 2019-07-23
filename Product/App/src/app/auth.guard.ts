import { Injectable } from '@angular/core';
import { CanActivate,Router } from '@angular/router';
import { Observable } from 'rxjs';
import {LoginService} from './vendor/login/login.service'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _login:LoginService,private _route:Router){}
  canActivate():boolean{
    if(this._login.loggedIn()){
      return true
    }else{
      this._route.navigate(['/'])
      return false
    }
  }
}
