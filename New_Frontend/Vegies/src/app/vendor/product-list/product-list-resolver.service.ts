import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../../login/login.service'
import { Injectable } from '@angular/core';
//import { configList } from '../dashboard/configList.service'

@Injectable()
export class productListResolver implements Resolve<any>{
    constructor(private _loginService:LoginService){}
    resolve(route:ActivatedRouteSnapshot,state:RouterStateSnapshot):Observable<any>{
        return this._loginService.user();
    }
}
