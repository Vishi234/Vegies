import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler ,HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router'
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppGlobals } from '../app.global';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private currentUserSubject: BehaviorSubject<any>;
  public userDetails:any;
  public currentUser: Observable<any>;
  constructor(private http: HttpClient, private router: Router, private _global: AppGlobals) {
    //  this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('token')));
    //  this.currentUser = this.currentUserSubject.asObservable();
  }
  private _vendorLogin = this._global.baseAppUrl + 'vendor/auth';
  private _vendorLogout = this._global.baseAppUrl + 'vendor/logout';
  private _vendorName= this._global.baseAppUrl + 'vendor/user'
  private _changePwd= this._global.baseAppUrl + 'vendor/changePwd'
  private _forgetPwd= this._global.baseAppUrl + 'vendor/forgetPwd'
  private _googleAuth= this._global.baseAppUrl + 'vendor/auth/google'

  public extractData(res: Response) {
    this.userDetails = res;
    if(this.userDetails.status==401){
      this.router.navigate(['/login']);
    }else
    return this.userDetails || { };
  }
 
  vendorLogin(body: any) {
    return this.http.post<any>(this._vendorLogin, body,{
      observe:'body',
      withCredentials:true,
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    })
  }
  // vendorLogin(user: any) {
  //   return this.http.post<any>(this._vendorLogin, user).pipe(map(userName => {
  //     if (userName && userName.token) {
  //       localStorage.setItem('token', JSON.stringify(userName));
  //       this.currentUserSubject.next(userName);
  //     }
  //     return userName;
  //   }));
  // }
  currentUserValue() {
    console.log("userDetails",this.userDetails)
    return this.userDetails;
  }

  changePassword(changePwd:any){
    console.log("changePwdchangePwd",changePwd)
    return this.http.post<any>(this._changePwd, changePwd);
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }
  logoutUser() {
    return this.http.get<any>(this._vendorLogout,{
      observe:'body',
      withCredentials:true,
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
  }
  getToken() {
    return localStorage.getItem('token');
  }

  forgetPassword(email:any){
    console.log("forgotPassword",email)
    return this.http.post<any>(this._forgetPwd,email,{
      observe:'body',
      headers:new HttpHeaders().append('Content-Type','application/json')
    })
    //return this.http.post<any>(this._forgetPwd, email);
  }
  getGoogleAuth() {
    return this.http.get(this._googleAuth);
}

  user(){
    return this.http.get(this._vendorName,{
      observe:'body',
      withCredentials:true,
      headers:new HttpHeaders().append('Content-Type','application/json')
    }).pipe(
      map(this.extractData));
  }
}
