import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AdminCategoryService 
{

  constructor(private http: HttpClient) { }
  private _adminCategoryUrl='http://localhost:8080/api/admin/category';
  private _subCatUrl='http://localhost:8080/api/admin/subCategory';

  AddCategory(user:any)
  {
    return this.http.post<any>(this._adminCategoryUrl,user);
  }
  GetCategoryList(){
  //  console.log('helllooooooooooooooooo')
    return this.http.get(this._adminCategoryUrl)
  }
  AddSubCategory(user:any){
  // console.log("hiiiiiiiii",user)
    return this.http.post<any>(this._subCatUrl,user);
  }
  GetSubCategoryList()
  {
  //  console.log('helllooooooooooooooooo11111111111')
    return this.http.get(this._subCatUrl)
  }

}
