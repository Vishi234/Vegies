import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router';
import { AppGlobals } from '../app.global';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient,public vendorRegis:RegisterService,private router:Router,private _global: AppGlobals) { }
  private _vendorRegistration=this._global.baseAppUrl + 'vendor/registration';

  
  vendorRegistration(user:any)
  {
    console.log("test register",user)
    return this.http.post<any>(this._vendorRegistration,user);
  }
}
