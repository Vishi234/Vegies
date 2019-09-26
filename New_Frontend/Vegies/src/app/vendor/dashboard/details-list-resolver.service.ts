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
        // getAuthorWithBooks(id: number): Observable<any> {
        //     return Observable.forkJoin([
        //       this.http.get('/api/authors/' + id).map(res => res.json()),
        //       this.http.get('/api/authors/' + id + '/books').map(res => res.json())
        //     ])
        //     .map((data: any[]) => {
        //       let author: any = data[0];
        //       let books: any[] = data[1];
        //       return author.books = books;
        //     });
        //   }
        this.userDetails = this._route.snapshot.data['userData'];
        console.log("=======+>>>",this.userDetails)
        // console.log("00000000000000000000))))))))",this.userDetails)
        // return this._configList.getProductList('x');
        return this.userDetails;
    }
}
