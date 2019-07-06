import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AdminCategoryService {

  constructor(private http: HttpClient) { }

  private _adminCategoryUrl='http://localhost:8080/api/admin/category'

  adminCategory(user:any){
    return this.http.post<any>(this._adminCategoryUrl,user)
  }
  getAPIData(){
    console.log("userrrrrrrrrr")
    return this.http.get('http://localhost:8080/api/admin/category')
  }

}
