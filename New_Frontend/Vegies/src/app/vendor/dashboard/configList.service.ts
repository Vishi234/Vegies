import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})
export class configList {
    constructor(private http: HttpClient) { }
    private _configProductURL = 'http://localhost:8080/api/configProduct/getList';
    private _removeProductURL = 'http://localhost:8080/api/configProduct/removeList/';
    private _addProductURL = 'http://localhost:8080/api/configProduct/addList/';

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