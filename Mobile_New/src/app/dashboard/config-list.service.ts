import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppGlobals } from '../app.global';

@Injectable({
    providedIn: 'root'
})
export class configList {
    constructor(private http: HttpClient, private _global: AppGlobals) { }
    private _configProductURL = this._global.baseAppUrl + 'configProduct/getList';
    private _removeProductURL = this._global.baseAppUrl + 'configProduct/removeList/';
    private _addProductURL = this._global.baseAppUrl + 'configProduct/addList/';
    private _getOrderURL = this._global.baseAppUrl + 'configProduct/getOrder/';

    getProductList(userId: any) {
        return this.http.get(this._configProductURL, {
            params: {
                userId: userId._id,
            }
        })
    }
    getOrderList(userId: any) {
        return this.http.get(this._getOrderURL, {
            params: {
                userId: userId._id,
            }
        })
    }

    delete(id: string) {
        return this.http.delete(this._removeProductURL + id);
    }
    addProductList(configProductList: any) {
        return this.http.post<any>(this._addProductURL, configProductList);
    }
}