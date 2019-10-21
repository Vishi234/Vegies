import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, observable } from 'rxjs';
import { configList } from './configList.service'
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { LoginService } from '../../login/login.service'
//import { configList } from '../dashboard/configList.service'

@Injectable()
export class detailsListResolver implements Resolve<any>{
    public userDetails:any;
    constructor(private _configList:configList,private _route:ActivatedRoute,private _loginService:LoginService){

    }
    resolve(route:ActivatedRouteSnapshot,state:RouterStateSnapshot):Observable<any>{
        this.userDetails = this._route.snapshot.data['userData'];
        console.log("=======+>>>",this.userDetails)
        return this.userDetails;
    }
}
