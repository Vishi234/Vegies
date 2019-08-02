import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})
export class configList {
    constructor(private http: HttpClient) { }
    private _configProductURL = 'http://localhost:8080/api/configProduct/getList';

    getProductList() {
        return this.http.get(this._configProductURL)
    }
}