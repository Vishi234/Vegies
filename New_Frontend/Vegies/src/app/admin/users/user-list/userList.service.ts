import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler ,HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router'
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppGlobals } from '../../../app.global';

@Injectable({
  providedIn: 'root'
})
export class userList {
  private currentUserSubject: BehaviorSubject<any>;
  public userDetails:any;
  public currentUser: Observable<any>;
  constructor(private http: HttpClient, private router: Router, private _global: AppGlobals) {
    //  this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('token')));
    //  this.currentUser = this.currentUserSubject.asObservable();
  }
  private _getUserDetails= this._global.baseAppUrl + 'userDetails/getVendorDetails'
  getUesrDetails() {
    return this.http.get(this._getUserDetails)
  }
 
}
