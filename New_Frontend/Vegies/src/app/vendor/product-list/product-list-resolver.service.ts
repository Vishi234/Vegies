import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../../login/login.service'
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
//import { configList } from '../dashboard/configList.service'

@Injectable()
export class productListResolver implements Resolve<any>{
    public userDetails:any;
    constructor(private _loginService:LoginService,private _route:ActivatedRoute){
        this.userDetails = this._route.snapshot.data['userData'];

    }
    resolve(route:ActivatedRouteSnapshot,state:RouterStateSnapshot):Observable<any>{
        return this._loginService.user();
    }
}
