import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }
  private _vendorRegistration='http://localhost:8080/api/vendor/registration';

  
  vendorRegistration(user:any)
  {
    console.log("test register",user)
    return this.http.post<any>(this._vendorRegistration,user);
  }
}
