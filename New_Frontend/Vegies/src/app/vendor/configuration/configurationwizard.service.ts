import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppGlobals } from '../../app.global';


@Injectable({
    providedIn: 'root'
})
export class configurationwizard {
    constructor(private http: HttpClient,private _global: AppGlobals) { }
    private _configProductURL = this._global.baseAppUrl + 'configProduct/saveList';

    AddConfigProduc(configProductList: any) {
        console.log("configureProduct",configProductList)
        return this.http.post<any>(this._configProductURL, configProductList);
    }
}