import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppGlobals } from '../../app.global';


@Injectable({
  providedIn: 'root'
})
export class AdminCategoryService {

  constructor(private http: HttpClient, private _global: AppGlobals) { }
  private _adminCategoryUrl = this._global.baseAppUrl + 'admin/category';
  private _subCatUrl = this._global.baseAppUrl + 'admin/subCategory';
  private _productUrl = this._global.baseAppUrl + 'admin/product';
  private _productImg = this._global.baseAppUrl + 'admin/product/images';

  AddCategory(user: any) 
  {
    console.log('user-->',user);
    return this.http.post<any>(this._adminCategoryUrl, user);
  }
  GetCategoryList() {
    return this.http.get(this._adminCategoryUrl)
  }
  AddSubCategory(user: any) {
    debugger;
    return this.http.post<any>(this._subCatUrl, user);
  }
  GetSubCategoryList() {
    return this.http.get(this._subCatUrl)
  }
  AddProduct(user: any, imageUrl: any) {
    user.imageUrl = imageUrl;
    return this.http.post<any>(this._productUrl, user)
  }
  GetProductList() {
    return this.http.get(this._productUrl)
  }
  UpdateProduct(user: any) {
    return this.http.put<any>(this._productUrl, user)
  }
  AddProductImages(formData: any) {
    return this.http.post<any>(this._productImg, formData)
  }
}
