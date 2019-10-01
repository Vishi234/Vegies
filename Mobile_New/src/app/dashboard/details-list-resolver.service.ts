import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, observable } from 'rxjs';
import { configList } from './config-List.service'
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { LoginService } from '../user-auth/login.service'
//import { configList } from '../dashboard/configList.service'

@Injectable()
export class detailsListResolver implements Resolve<any>{
    public userDetails:any;
    constructor(private _loginService:LoginService,private _route:ActivatedRoute){
        this.userDetails = this._route.snapshot.data['userData'];

    }
    resolve(route:ActivatedRouteSnapshot,state:RouterStateSnapshot):Observable<any>{
        return this._loginService.user();
    }
}
