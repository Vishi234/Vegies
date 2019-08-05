import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
//import { User } from '@/_models';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  private _vendorLogin = 'http://localhost:8080/api/vendor/login';
  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('token')));
    this.currentUser = this.currentUserSubject.asObservable();
  }
  vendorLogin(user: any) {
    console.log("test register", user)
    return this.http.post<any>(this._vendorLogin, user).pipe(map(userName => {
      if (userName && userName.token) {
        localStorage.setItem('token', JSON.stringify(userName));
        this.currentUserSubject.next(userName);
      }
      return userName;
    }));
  }
  currentUserValue(){
    console.log("dataaaaaaaa",this.currentUserSubject)
    return this.currentUserSubject.value;
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }
  logoutUser() {
    console.log("loggout")
    localStorage.removeItem('token');
    this.router.navigate(["/"]);
  }
  getToken() {
    return localStorage.getItem('token');
  }
}
