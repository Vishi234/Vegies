import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private _vendorLogin='http://localhost:8080/api/vendor/login';
  constructor(private http: HttpClient) { }
  vendorLogin(user:any)
  {
    console.log("test register",user)
    return this.http.post<any>(this._vendorLogin,user);
  }
}
