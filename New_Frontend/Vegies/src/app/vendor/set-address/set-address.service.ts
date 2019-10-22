import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppGlobals } from '../../app.global';

@Injectable({
    providedIn: 'root'
})
export class setAddress {
    constructor(private http: HttpClient, private _global: AppGlobals) { }
    private _getAddressURL = this._global.baseAppUrl + 'configProduct/getAddress';
    private _addAddressURL = this._global.baseAppUrl + 'configProduct/addAddress/';

    getAddressList(userId: any) {
        console.log("getAddress",userId)
        return this.http.get(this._getAddressURL, {
            params: {
                userId: userId._id,
            }
        })
    }
    addAddressList(addAddressList: any) {
    console.log("aaaaaaaaaddddd",addAddressList)
        return this.http.post<any>(this._addAddressURL, addAddressList);
    }
}