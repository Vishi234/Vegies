import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})
export class configList {
    constructor(private http: HttpClient) { }
    private _configProductURL = 'http://localhost:8080/api/configProduct/getList';
    private _removeProductURL = 'http://localhost:8080/api/configProduct/removeList/';

    getProductList() {
        return this.http.get(this._configProductURL)
    }

    delete(id: string) {
        console.log("deleted items are",this._removeProductURL + id[0])
        return this.http.delete(this._removeProductURL + id[0]);
    }
}