import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppGlobals } from '../app.global';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  constructor(private http: HttpClient, private router: Router, private _global: AppGlobals) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('token')));
    this.currentUser = this.currentUserSubject.asObservable();
  }
  private _vendorLogin = this._global.baseAppUrl + 'vendor/login';
  vendorLogin(user: any) {
    return this.http.post<any>(this._vendorLogin, user).pipe(map(userName => {
      if (userName && userName.token) {
        localStorage.setItem('token', JSON.stringify(userName));
        this.currentUserSubject.next(userName);
      }
      return userName;
    }));
  }
  currentUserValue() {
    return this.currentUserSubject.value;
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }
  logoutUser() {
    localStorage.removeItem('token');
    this.router.navigate(["/"]);
  }
  getToken() {
    return localStorage.getItem('token');
  }
}
