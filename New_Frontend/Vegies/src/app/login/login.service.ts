import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private _vendorLogin='http://localhost:8080/api/vendor/login';
  constructor(private http: HttpClient,private router:Router) { }
  vendorLogin(user:any)
  {
    console.log("test register",user)
    return this.http.post<any>(this._vendorLogin,user);
  }
  loggedIn(){
    return !!localStorage.getItem('token');
  }
  logoutUser(){
    console.log("loggout")
    localStorage.removeItem('token');
    this.router.navigate(["/"]);
  }
  getToken(){
    return localStorage.getItem('token');
  }
}
