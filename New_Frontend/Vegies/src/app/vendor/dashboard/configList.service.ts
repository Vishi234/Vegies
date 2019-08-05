import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppGlobals } from '../../app.global';

@Injectable({
    providedIn: 'root'
})
export class configList {
    constructor(private http: HttpClient,private _global: AppGlobals) { }
    private _configProductURL = this._global.baseAppUrl + 'configProduct/getList';
    private _removeProductURL = this._global.baseAppUrl + 'configProduct/removeList/';
    private _addProductURL = this._global.baseAppUrl + 'configProduct/addList/';

    getProductList() {
        return this.http.get(this._configProductURL)
    }
    delete(id: string) {
        console.log("idddddddddddddd",this._removeProductURL + id)
        return this.http.delete(this._removeProductURL + id);
    }
    addProductList(configProductList: any) {
        console.log("deleted items are",this._removeProductURL)
        return this.http.post<any>(this._addProductURL, configProductList);
    }
}