import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})
export class configurationwizard {
    constructor(private http: HttpClient) { }
    private _configProductURL = 'http://localhost:8080/api/configProduct/saveList';

    AddConfigProduc(configProductList: any) {
        console.log("configureProduct",configProductList)
        return this.http.post<any>(this._configProductURL, configProductList);
    }
}