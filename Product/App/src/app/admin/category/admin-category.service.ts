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
  private _productUrl='http://localhost:8080/api/admin/product';
  private _productImg='http://localhost:8080/api/admin/product/images';

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
  AddProduct(user:any)
  {
  // console.log('helllooooooooooooooooo11111111111',user)
    return this.http.post<any>(this._productUrl,user)
  }
  GetProductList()
  {
    console.log('helllooooooooooooooooo11111111111')
    return this.http.get(this._productUrl)
  }
  UpdateProduct(user:any)
  {
  // console.log('helllooooooooooooooooo11111111111',user)
    return this.http.put<any>(this._productUrl,user)
  }
  AddProductImages(formData:any)
  {
  // console.log('helllooooooooooooooooo11111111111',user)
    return this.http.post<any>(this._productImg,formData)
  }
}
